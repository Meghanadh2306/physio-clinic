const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  title: String,
  phone: String,
  subtitles: [String],
  image: String,
  doctorName: String,
doctorRole: String,
});

module.exports = mongoose.model("Home", homeSchema);