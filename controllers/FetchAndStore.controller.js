import mongoose from "mongoose";
import CryptoModel from "../models/CryptoModel.js";

const fetchAndStoreCryptoData = async () => {
  try {
    const response = await fetch(`${process.env.COINGECKO_API_BASE_URL}/coins/list`);
    const data = await response.json();

    const session = await mongoose.startSession();
    session.startTransaction();

    let snapshot; // To store a snapshot of the collection

    try {
      // Take a snapshot of the collection before the bulk write
      snapshot = await CryptoModel.find({}).lean().session(session);

      // Delete all documents in the collection so that the deleted coins are not part of the collection 
      await CryptoModel.deleteMany({}, { session });

      // Insert new documents
      await CryptoModel.insertMany(data, { session });

      await session.commitTransaction();
      session.endSession();

      console.log('Cryptocurrency data updated and stored.');
    } catch (error) {
      // If an error occurs during bulk write, reset the collection
      if (snapshot) {
        await CryptoModel.deleteMany({}, { session });
        await CryptoModel.insertMany(snapshot, { session });
      }

      await session.abortTransaction();
      session.endSession();

      console.error('Error updating cryptocurrency data:', error);
      console.log('Collection reset to previous state.');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchAndStoreCryptoData;
