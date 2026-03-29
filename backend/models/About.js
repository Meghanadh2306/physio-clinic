const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  quote: String,
  points: [String],
  image: String,
  experience: String
});

module.exports = mongoose.model("About", AboutSchema);