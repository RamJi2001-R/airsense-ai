// localhost:8000 ki jagah ML service URL
const ML_URL = process.env.ML_SERVICE_URL || 'https://airsense-ml-w1oj.onrender.com'

router.get('/forecast/:aqi', async (req, res) => {
  try {
    const { aqi } = req.params
    const response = await axios.get(`${ML_URL}/forecast/${aqi}`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})

router.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(`${ML_URL}/predict`, req.body)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'ML Service error' })
  }
})