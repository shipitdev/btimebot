const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json);

//baby logger for now
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const v1Limiter = rateLimit({
    windowMs: 60_000,
    max:60,
    standardHeaders: true,
    legacyHeaders: false
});
app.use(v1Limiter);

//health route to check if running
app.get('/health', (req,res) => {
    res.json({ ok: true});
});

//v1 routes
const { getSummary } = require('./controllers/summary.controller');
app.get('/v1/summary', getSummary);

//404+ error handlers (MUST be after routes)
// if no routes matched, this runs:
app.use((req,res) => {
    res.status(404).json({error: {code: 404, message: "Not found"}});
});

//Central error handler: any thrown error lands here
app.use((err,req,res,next) => {
    const code = err.status || 500;
    res.status(code).json({ error: {code, message: err.message || "Internal Error"}});
});

module.exports = app;

