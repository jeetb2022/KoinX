import mongoose from "mongoose";
import CryptoModel from "../models/CryptoModel.js";

/**
 * Function to fetch cryptocurrency data from an external API and store it in the database.
 * This function fetches data from the CoinGecko API, deletes the existing collection in the database,
 * and inserts the new data. It also handles transactions to ensure data consistency.
 */
const fetchAndStoreCryptoData = async () => {
  try {
    // Fetch data from the CoinGecko API
    const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/list`);
    const data = await response.json();

    // Start a MongoDB session for transaction handling
    const session = await mongoose.startSession();
    session.startTransaction();

    let snapshot; // To store a snapshot of the collection

    try {
      // Take a snapshot of the collection before the bulk write
      snapshot = await CryptoModel.find({}).lean().session(session);

      // Delete all documents in the collection
      await CryptoModel.deleteMany({}, { session });

      // Insert new documents
      await CryptoModel.insertMany(data, { session });

      // Commit the transaction if successful
      await session.commitTransaction();
      session.endSession();

      console.log('Cryptocurrency data updated and stored.');
    } catch (error) {
      // If an error occurs during bulk write, reset the collection to previous state
      if (snapshot) {
        await CryptoModel.deleteMany({}, { session });
        await CryptoModel.insertMany(snapshot, { session });
      }

      // Abort the transaction and handle error
      await session.abortTransaction();
      session.endSession();

      console.error('Error updating cryptocurrency data:', error);
      console.log('Collection reset to previous state.');
    }

  } catch (error) {
    // Catch any error during the fetch process
    console.error('Error fetching data:', error);
  }
};

// Export the fetchAndStoreCryptoData function for use in other files
export default fetchAndStoreCryptoData;
