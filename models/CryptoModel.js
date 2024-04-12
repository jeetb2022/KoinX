import mongoose from 'mongoose'; // Importing mongoose for schema and model creation

// Defining the schema for the cryptocurrency data
const cryptoSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Field for cryptocurrency ID, must be a string and is required
  name: { type: String, required: true }, // Field for cryptocurrency name, must be a string and is required
});

// Creating a model based on the schema, named 'cryptos'
const CryptoModel = mongoose.model('cryptos', cryptoSchema);

export default CryptoModel; // Exporting the CryptoModel for use in other files

