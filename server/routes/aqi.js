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

// Delete All History for User (must be BEFORE delete single entry)
router.delete('/history/user/:userId', async (req, res) => {
  try {
    const result = await AQILog.deleteMany({ userId: req.params.userId })
    res.json({ message: 'All history deleted', deletedCount: result.deletedCount })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete Single History Entry
router.delete('/history/:logId', async (req, res) => {
  try {
    const log = await AQILog.findByIdAndDelete(req.params.logId)
    if (!log) {
      return res.status(404).json({ message: 'History entry not found' })
    }
    res.json({ message: 'History entry deleted', log })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router