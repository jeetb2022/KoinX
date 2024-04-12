// Middleware function to check the provided cryptocurrency data
const checkCrypto = async (req, res, next) => {
    const { body } = req;

    // Check if any required fields are missing
    if (body.fromCurrency === undefined || body.toCurrency === undefined || body.date === undefined) {
        return res.status(403).json({ error: "Please enter all data" });
    }

    // Regular expression to validate date format (dd-mm-yyyy)
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

    // Check if the date is in the correct format (dd-mm-yyyy)
    if (!dateRegex.test(body.date)) {
        return res.status(403).json({ error: "Please enter a valid date in the format dd-mm-yyyy" });
    }

    // Split the provided date into day, month, and year
    const [day, month, year] = body.date.split("-");
    
    // Create a new Date object from the provided date
    const providedDate = new Date(year, month - 1, day); // Note: month is 0-indexed in JavaScript
    
    // Get today's date
    const today = new Date();

    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = today - providedDate;

    // Calculate the difference in days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    // Check if the date is more than a year old
    if (differenceInDays > 365) {
        return res.status(403).json({ error: "Date must not be more than a year old" });
    }
    
    // Check if the date is in future
    if (differenceInDays < 0) {
        return res.status(403).json({ error: "Date entered must be before today" });
    }

    // If all checks pass, set the request properties and proceed
    req.fromCurrency = body.fromCurrency;
    req.toCurrency = body.toCurrency;
    req.date = body.date;
    next();
};

// Export the checkCrypto middleware for use in other files
export default checkCrypto;
