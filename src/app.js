const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json);
//baby logger for now
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(rateLimit({
    windowMS: 60_000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
}));

//Tiny routes
app.get('/health', (req,res) => {
    res.json({ ok: true});
});

//real logic soon
app.get('/v1/summary', (req,res) => {
    res.json({
        message: 'Summary endpoint is reachable. Next: validation -> time conversion -> Binance fetch -> analysis.'
    });
});

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

