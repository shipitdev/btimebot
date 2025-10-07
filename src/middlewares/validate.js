function validateRequest(req, res, next) {
  const { symbol, interval, date, time } = req.query;
  if (!symbol || !interval || !date || !time) {
    return res.status(400).json({
      message: "Missing required parameters: symbol, interval, date, time",
    });
  }
  next();
}

module.exports = { validateRequest };