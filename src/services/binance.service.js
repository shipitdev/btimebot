const axios = require('axios');
const { BINANCE_BASE_URL } = require('../config');

async function fetchCandles(symbol, interval = '1m') {
    const response = await axios.get(`${BINANCE_BASE_URL}/klines`, {
        params: { symbol, interval, limit: 60}
    });
    const data = response.data[0];
    return {
        openTime: data[0],
        open: parseFloat(data[1]),
        high: parseFloat(data[2]),
        low: parseFloat(data[3]),
        close: parseFloat(data[4]),
        volume: parseFloat(data[5]),
        closeTime: data[6]
    };
};

module.exports = {fetchCandles};