const axios = require("axios");
const { BINANCE_API } = require("../config/env");
const { getCandleTimestamps } = require("./time.service");

async function fetchCandle(symbol, interval, date, time) {
  const { startTime, endTime, targetDate } = getCandleTimestamps(date, time, interval);

  const { data } = await axios.get(`${BINANCE_API}/klines`, {
    params: { symbol, interval, startTime, endTime, limit: 1 },
  });

  if (!data.length) return null;

  const [openTime, open, high, low, close, volume] = data[0];

  return {
    symbol,
    interval,
    open: parseFloat(open),
    close: parseFloat(close),
    high: parseFloat(high),
    low: parseFloat(low),
    volume: parseFloat(volume),
    openTime,
    targetDate,
  };
}

module.exports = { fetchCandle };