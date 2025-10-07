const axios = require("axios");
const { BINANCE_API } = require("../config/env");
const { getCandleTimestamps } = require("./time.service");

async function getKlineendpoint(marketType){
    return marketType==="spot"?"/api/v3/klines" : marketType==="futures"?"/fapi/v1/klines":"/dapi/v1/klines";
};

async function fetchCandle(symbol, interval, date, time,marketType) {
  const { startTime, endTime, targetDate } = getCandleTimestamps(date, time, interval);

  const base = BINANCE_API[marketType] || BINANCE_API.spot;
  const endpoint = await getKlineendpoint(marketType);
  const url = `${base}${endpoint}`;

  const params = {
    symbol,
    interval,
    startTime,
    endTime,
    limit: 1,
  };

  const response = await axios.get(url, { params });
  const data = response.data;

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