const { fetchCandle } = require("../services/binance.service");
const { analyzeCandle } = require("../services/analysis.service");

const getCandleSummary = async (req, res, next) => {
  try {
    const { symbol, interval, date, time, marketType } = req.query;

    const candle = await fetchCandle(symbol, interval, date, time, marketType || "spot");
    if (!candle) return res.status(404).json({ message: "No candle found for given time" });

    const analysis = analyzeCandle(candle);

    res.json({ ...candle, ...analysis });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCandleSummary };