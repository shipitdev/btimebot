const express = require("express");
const summaryRoutes = require("./routes/summary.routes");
const { rateLimiter } = require("./middlewares/rateLimit");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/summary", summaryRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;