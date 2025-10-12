/**
 * Convert date + time into Binance-compatible timestamps (ms)
 */
function getCandleTimestamps(date, time, interval) {
  const targetDate = new Date(`${date}T${time}Z`); // UTC time
  if (isNaN(targetDate)) {
    throw new Error("Invalid date or time format. Use (YYYY-MM-DD, HH:mm:ss)");
  }

  const intervalMap = {
    "1m": 60 * 1000,
    "3m": 3 * 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "30m": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
  };

  const intervalMs = intervalMap[interval];
  if (!intervalMs) throw new Error(`Unsupported interval: ${interval}`);

  const startTime = targetDate.getTime();
  const endTime = startTime + intervalMs;

  return { startTime, endTime, targetDate };
}

module.exports = { getCandleTimestamps };