const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  address: String,
  phone: String,
  whatsapp: String,
  hours: String,
  instagram: String,
  map: String
});

module.exports = mongoose.model("Contact", ContactSchema);