import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const CryptoModel = mongoose.model('cryptos', cryptoSchema);

export default CryptoModel;