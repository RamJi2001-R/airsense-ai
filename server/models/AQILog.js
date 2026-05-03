const mongoose = require('mongoose')

const aqiLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: { type: String, required: true },
  aqi: { type: Number, required: true },
  dominentPollutant: { type: String },
  savedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('AQILog', aqiLogSchema)