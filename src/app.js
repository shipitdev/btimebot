const express = require("express");
const summaryRoutes = require("./routes/summary.routes");
const { rateLimiter } = require("./middlewares/rateLimit");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use("./routes", summaryRoutes);
app.use(errorHandler);

module.exports = app;