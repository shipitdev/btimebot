const logger = require('../utils/logger');

module.exports = function errorMiddleware(err, _req, res, _next) {
  logger.error({ err }, 'Unhandled error');
  const code = err.status || 500;
  res.status(code).json({ error: { code, message: err.message || 'Internal error' } });
};