const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: String,
  title: String
});

module.exports = mongoose.model("Certificate", schema);