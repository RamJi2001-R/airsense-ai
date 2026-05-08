const express = require('express')
const axios = require('axios')

const router = express.Router()

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000'

// Get 24hr AQI Forecast
router.get('/forecast/:aqi', async (req, res) => {
  try {
    const { aqi } = req.params
    const response = await axios.get(`${ML_URL}/forecast/${aqi}`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})

// Predict AQI from pollutants
router.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(`${ML_URL}/predict`, req.body)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})

module.exports = router