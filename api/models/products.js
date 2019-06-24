const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  price: Number
});

// export schema wrapped in a model
module.exports = mongoose.model('Product', productSchema);