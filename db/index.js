import mongoose from 'mongoose'; // Importing mongoose for MongoDB connection
import dotenv from 'dotenv'; // Importing dotenv for environment variables
dotenv.config(); // Loading environment variables from .env file

// MongoDB client options for connection
const clientOptions = {
  useNewUrlParser: true, // Use new URL parser
  useUnifiedTopology: true, // Use new server discovery and monitoring engine
};

// Async function to establish connection with MongoDB
async function run() {
  try {
    // Connect to MongoDB using MONGO_URL from environment variables
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    console.log("MongoDB connected!"); // Log successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Log error if connection fails
    throw new Error(error); // Throw an error to handle connection failure
  }
}

export default run; // Exporting the run function for use in app.js

