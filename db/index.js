import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGO_URL;

// Options for the MongoDB client
const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/**
 * Function to establish connection with MongoDB.
 * This function is used to connect to the MongoDB database using Mongoose.
 */
async function run() {
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(uri, clientOptions);
        console.log("MongoDB connected!");
    } catch (error) {
        // If an error occurs while connecting, log the error
        console.error("Error connecting to MongoDB:", error);
        // Throw an error to handle it in the calling code
        throw new Error(error);
    }
}

// Export the run function for use in other files
export default run;
