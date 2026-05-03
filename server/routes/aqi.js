const express = require('express')
const AQILog = require('../models/AQILog')

const router = express.Router()

// Save AQI Search
router.post('/save', async (req, res) => {
  try {
    const { userId, city, aqi, dominentPollutant } = req.body
    const log = await AQILog.create({ userId, city, aqi, dominentPollutant })
    res.status(201).json({ message: 'AQI log saved', log })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get User History
router.get('/history/:userId', async (req, res) => {
  try {
    const logs = await AQILog.find({ userId: req.params.userId }).sort({ savedAt: -1 })
    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router