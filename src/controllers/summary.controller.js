const { fetchCandle } = require('../services/binance.service');
const { analyzeCandle } = require('../services/analysis.service');

async function getCandleSummary(req, res, next) {
    try {
        const { symbol, interval } = req.query;
        const candle = await fetchCandle(symbol.toUpperCase(), interval || '1m');
        const analysis = analyzeCandle(candle);
        res.json(analysis);
    } catch (err) {
        next(err); // pass to errorHandler
    }
}

module.exports = { getCandleSummary };