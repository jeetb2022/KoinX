// Middleware function to check the provided currency
const checkCurrencies = async (req, res, next) => {
    const { body } = req;

    // Check if currency is provided in the request body
    if (!body.currency) {
        return res.status(403).json({ error: "Please enter the currency" });
    }

    // Check if the provided currency is either bitcoin or ethereum
    if (body.currency !== 'bitcoin' && body.currency !== 'ethereum') {
        return res.status(403).json({ error: "Enter either bitcoin or ethereum as a currency" });
    }

    // If currency is valid, set it in the request object
    req.currency = body.currency;

    // Proceed to the next middleware or route handler
    next();
};

// Export the checkCurrencies middleware for use in other files
export default checkCurrencies;
