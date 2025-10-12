const axios = require("axios");
const { getCandleTimestamps } = require("./time.service");

const BINANCE_API = {
  spot: "https://api.binance.com",
  futures: "https://fapi.binance.com",
  coinfutures: "https://dapi.binance.com",
};

function getKlineEndpoint(marketType) {
  if (marketType === "spot") return "/api/v3/klines";
  if (marketType === "futures") return "/fapi/v1/klines";
  if (marketType === "coinfutures") return "/dapi/v1/klines";
  return "/api/v3/klines"; // default spot
}

async function fetchCandle(symbol, interval, date, time, marketType = "spot") {
  if (!symbol || !interval || !date || !time) {
    throw new Error("Missing required parameters: symbol, interval, date, time");
  }

  const { startTime, endTime, targetDate } = getCandleTimestamps(date, time, interval);
  const base = BINANCE_API[marketType] || BINANCE_API.spot;
  const endpoint = getKlineEndpoint(marketType);

  const url = `${base}${endpoint}`;
  const params = { symbol, interval, startTime, endTime, limit: 1 };

  console.log(`🔍 Fetching ${marketType.toUpperCase()} data from: ${url}`);
  console.log("Params:", params);

  const response = await axios.get(url, { params });
  const data = response.data;

  if (!data.length) throw new Error("No candle found for that time. Check UTC and interval.");

  const [openTime, open, high, low, close, volume] = data[0];

  return {
    symbol,
    interval,
    marketType,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    volume: parseFloat(volume),
    openTime,
    startTime,
    endTime,
    targetDate,
  };
}

module.exports = { fetchCandle };