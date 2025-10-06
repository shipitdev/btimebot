const express = require('express');
const app = express();
const summaryRoute = require('./routes/summary');
const apiLimiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');

app.use('/api', apiLimiter);
app.use('/api/summary', summaryRoute);
app.use(errorHandler); // must be last

module.exports = app;