const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const aqiRoutes = require('./routes/aqi')
const predictRoutes = require('./routes/predict')
const alertRoutes = require('./routes/alerts')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/aqi', aqiRoutes)
app.use('/api/ml', predictRoutes)
app.use('/api/alerts', alertRoutes)

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err))

// Server Start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))