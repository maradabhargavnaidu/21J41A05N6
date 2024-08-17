const express = require('express');
const { handleNumberRequest } = require('./controller');
const router = express.Router();

router.route('/numbers/:category').get(handleNumberRequest);

module.exports = router;
