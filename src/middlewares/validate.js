const { DEFAULT_INTERVALS } = require('../config');

function validateCandleRequest(req, res, next) {
    const { symbol, interval } = req.query;

    if (!symbol) return res.status(400).json({ error: 'symbol is required' });
    if (interval && !DEFAULT_INTERVALS.includes(interval)) {
        return res.status(400).json({ error: 'Invalid interval. Allowed: ' + DEFAULT_INTERVALS.join(', ') });
    }

    next();
}

module.exports = { validateCandleRequest };