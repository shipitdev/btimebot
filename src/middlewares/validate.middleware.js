module.exports = function validate(schema) {
    return (req,res,next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                error: {code: 400, message: 'Validation failed', details: result.error.flatten()}
            });
        }
        req.validatedQuery = result.data; // put clean data here
        next();
    };
};