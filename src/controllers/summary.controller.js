async function getSummary(req,res,next) {
    try {
        //pretend we did some work: read params, call a service/DB, compute a summary...
        const result = { summary: 'Hello from v1 summary!', at: new Date().toISOString() };
        res.status(200).json(result); // hands back the result to express -> client
    } catch (err) {
        next(err);
    }
};

module.exports = { getSummary };