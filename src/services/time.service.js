/**
 * Converts date (YYYY-MM-DD) and time (HH:mm:ss) into
 * Binance-compatible startTime and endTime (timestamps in ms)
 */
function getCandleTimestamps(date, time, interval = "1m") {
  if (!date || !time) {
    throw new Error("Date and time are required");
  }

  const target = new Date(`${date}T${time}Z`);
  if (isNaN(target.getTime())) {
    throw new Error("Invalid date or time format. Expected YYYY-MM-DD and HH:mm:ss");
  }

  const startTime = target.getTime();

  const INTERVALS_MS = {
    "1m": 60 * 1000,
    "3m": 3 * 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
  };

  const intervalMs = INTERVALS_MS[interval] || 60 * 1000;
  const endTime = startTime + intervalMs;

  return { startTime, endTime, targetDate: target };
}

module.exports = { getCandleTimestamps };