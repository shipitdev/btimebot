function analyzeCandle(candle) {
    const { open, high, low, close } = candle;
    return {
        ...candle,
        pumpPercent: ((high - open)/open * 100).toFixed(2),
        dumpPercent: ((open - low)/open * 100).toFixed(2),
        netPercent: ((close - open)/open * 100).toFixed(2)
    };
}

module.exports = { analyzeCandle };