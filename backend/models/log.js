const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  symptoms: { type: String, required: true },
  diet: { type: String, required: true },
  sleepHours: { type: Number },
  exercise: { type: String }
});

module.exports = mongoose.model('Log', logSchema);
