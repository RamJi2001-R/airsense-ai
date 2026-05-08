const express = require('express')
const mongoose = require('mongoose')
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

// Delete Single Log
router.delete('/delete/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid log ID' })
    }
    const deleted = await AQILog.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Log not found' })
    res.json({ message: 'Log deleted successfully' })
  } catch (err) {
    console.error('Delete single log error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Clear All History
router.delete('/clear/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }
    const userId = new mongoose.Types.ObjectId(req.params.userId)
    await AQILog.deleteMany({ userId })
    res.json({ message: 'History cleared successfully' })
  } catch (err) {
    console.error('Clear history error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router