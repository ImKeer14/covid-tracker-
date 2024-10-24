const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  region: String,
  activeCases: Number,
  recoveries: Number,
  deaths: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);
