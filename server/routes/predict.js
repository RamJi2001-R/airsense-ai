const express = require('express')
const axios = require('axios')

const router = express.Router()

// Get 24hr AQI Forecast
router.get('/forecast/:aqi', async (req, res) => {
  try {
    const { aqi } = req.params
    const response = await axios.get(
      `http://localhost:8000/forecast/${aqi}`
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})

// Predict AQI from pollutants
router.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/predict',
      req.body
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})

module.exports = router