const axios = require('axios');

const SLIDING_WINDOW_SIZE = 10;
const REQUEST_TIMEOUT_MS = 500;
const API_BASE_URL = 'http://20.244.56.144/test/';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODcyNjExLCJpYXQiOjE3MjM4NzIzMTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg1OTVlMmJjLTRlMzgtNGIyYS04NzUyLTNjMDQ0MDY3MmQwMSIsInN1YiI6ImJoYXJnYXYubmFpZHUubWJuLjE4QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiODU5NWUyYmMtNGUzOC00YjJhLTg3NTItM2MwNDQwNjcyZDAxIiwiY2xpZW50U2VjcmV0IjoiWE1odGVJTmFtbXBIekhxcyIsIm93bmVyTmFtZSI6IkJoYXJnYXZOYWlkdSIsIm93bmVyRW1haWwiOiJiaGFyZ2F2Lm5haWR1Lm1ibi4xOEBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUo0MUEwNU42In0.aD9eOWyEc1OL5MKfdEAdqQjeDB4cE27HZqA7gvnrnzU';

let storedNumbers = [];

const getUniqueItem = (item) => {
    return item === null || item === undefined ? null : storedNumbers.includes(item) ? null : item;
};

const computeAverage = (array) => {
    if (array.length === 0) return 0;
    const total = array.reduce((accumulator, value) => accumulator + value, 0);
    return (total / array.length).toFixed(2);
};

const retrieveNumbers = async (category) => {
    const endpoints = {
        'prime': 'primes',
        'fibonacci': 'fibo',
        'even': 'even',
        'random': 'rand'
    };

    const endpoint = endpoints[category];
    if (!endpoint) {
        throw new Error('Invalid category specified');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    try {
        console.log(`Fetching numbers from endpoint: ${url}`); 
        const response = await axios.get(url, {
            timeout: REQUEST_TIMEOUT_MS,
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        console.log(`Response data: ${JSON.stringify(response.data)}`); 
        return response.data.numbers;
    } catch (error) {
        console.error(`Data retrieval error: ${error.message}`); 
        throw new Error('Error retrieving data from the API');
    }
};

const handleNumberRequest = async (req, res) => {
    const category = req.params.category;
    console.log(`Processing request for category: ${category}`);
    
    try {
        const newNumbers = await retrieveNumbers(category);
        console.log(`Fetched numbers: ${JSON.stringify(newNumbers)}`); 

        const uniqueItems = newNumbers
            .map(getUniqueItem)
            .filter(item => item !== null);

        storedNumbers = [...storedNumbers, ...uniqueItems].slice(-SLIDING_WINDOW_SIZE);

        const previousState = storedNumbers.slice(0, storedNumbers.length - uniqueItems.length);
        const currentState = storedNumbers;
        const average = computeAverage(storedNumbers);

        res.json({
            previousState,
            currentState,
            numbers: uniqueItems,
            average
        });
    } catch (error) {
        console.error(`Server error: ${error.message}`); 
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleNumberRequest };
