const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests, please try again later.",
});

module.exports = { rateLimiter };