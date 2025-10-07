function analyzeCandle(candle) {
  const { open, close, volume } = candle;
  const percentChange = (((close - open) / open) * 100).toFixed(2);
  const movement = percentChange > 0 ? "Pump" : percentChange < 0 ? "Dump" : "Flat";

  return {
    movement,
    percentChange: `${percentChange}%`,
    volume,
  };
}

module.exports = { analyzeCandle };