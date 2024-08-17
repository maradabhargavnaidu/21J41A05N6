import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://20.244.56.144/test/companies';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODcyNjExLCJpYXQiOjE3MjM4NzIzMTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg1OTVlMmJjLTRlMzgtNGIyYS04NzUyLTNjMDQ0MDY3MmQwMSIsInN1YiI6ImJoYXJnYXYubmFpZHUubWJuLjE4QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiODU5NWUyYmMtNGUzOC00YjJhLTg3NTItM2MwNDQwNjcyZDAxIiwiY2xpZW50U2VjcmV0IjoiWE1odGVJTmFtbXBIekhxcyIsIm93bmVyTmFtZSI6IkJoYXJnYXZOYWlkdSIsIm93bmVyRW1haWwiOiJiaGFyZ2F2Lm5haWR1Lm1ibi4xOEBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUo0MUEwNU42In0.aD9eOWyEc1OL5MKfdEAdqQjeDB4cE27HZqA7gvnrnzU";
// Function to fetch products with Bearer token
export const fetchProducts = async (company, category, minPrice, maxPrice, topN, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${company}/categories/${category}/products/top-${topN}?minPrice=${minPrice}&maxPrice=${maxPrice}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Use the token parameter here
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
