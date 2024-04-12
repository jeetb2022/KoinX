import mongoose from "mongoose"; // Importing mongoose for database operations
import CryptoModel from "../models/CryptoModel.js"; // Importing the CryptoModel for interacting with the database

const fetchAndStoreCryptoData = async () => {
  try {
    // Fetch the list of cryptocurrencies from the Coingecko API
    const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/list`);
    const data = await response.json(); // Convert API response to JSON

    const session = await mongoose.startSession(); // Start a new database session
    session.startTransaction(); // Start a database transaction

    let snapshot; // To store a snapshot of the collection

    try {
      // Take a snapshot of the collection before the bulk write
      snapshot = await CryptoModel.find({}).lean().session(session);

      // Delete all documents in the collection to prepare for new data
      await CryptoModel.deleteMany({}, { session });

      // Insert new documents fetched from the API
      await CryptoModel.insertMany(data, { session });

      await session.commitTransaction(); // Commit the transaction
      session.endSession(); // End the session

      console.log('Cryptocurrency data updated and stored.'); // Log success message
    } catch (error) {
      // If an error occurs during bulk write, reset the collection to previous state
      if (snapshot) {
        await CryptoModel.deleteMany({}, { session });
        await CryptoModel.insertMany(snapshot, { session });
      }

      await session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session

      console.error('Error updating cryptocurrency data:', error); // Log error message
      console.log('Collection reset to previous state.'); // Log collection reset message
    }

  } catch (error) {
    console.error('Error fetching data:', error); // Log error message for API fetch
  }
};

export default fetchAndStoreCryptoData; // Export the fetchAndStoreCryptoData function for use in other files

