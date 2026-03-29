const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String, // Popular / Most Requested
  icon: String // emoji or icon text
});

module.exports = mongoose.model("Service", serviceSchema);