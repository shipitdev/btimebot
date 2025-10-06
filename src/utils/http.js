// simple axios instance for all outgoing HTTP
const axios = require('axios');

const http = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
  timeout: 7000,
  headers: { 'User-Agent': 'btimebot/1.0' }
});

module.exports = http;