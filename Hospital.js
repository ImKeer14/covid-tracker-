const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  region: String,
  availableBeds: Number,
  ventilators: Number,
  icuCapacity: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
