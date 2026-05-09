const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
})

// Send AQI Alert Email
router.post('/email', async (req, res) => {
  try {
    const { email, city, aqi, aqiLabel } = req.body

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `🚨 AQI Alert — ${city} Air Quality is ${aqiLabel}!`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #111827; color: white; padding: 30px; border-radius: 12px;">
          <h1 style="color: #34D399;">🌍 AirSense AI — AQI Alert</h1>
          <p style="color: #9CA3AF;">Air quality alert for your tracked city</p>
          
          <div style="background: #1F2937; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: white;">📍 ${city}</h2>
            <p style="font-size: 48px; font-weight: bold; color: #EF4444; margin: 0;">${aqi}</p>
            <p style="color: #EF4444; font-size: 20px;">${aqiLabel}</p>
          </div>

          <div style="background: #1F2937; padding: 20px; border-radius: 10px;">
            <h3 style="color: #34D399;">⚠️ Health Recommendations:</h3>
            <ul style="color: #D1D5DB;">
              <li>Avoid outdoor activities</li>
              <li>Wear N95 mask if going out</li>
              <li>Keep windows and doors closed</li>
              <li>Use air purifier indoors</li>
            </ul>
          </div>

          <p style="color: #6B7280; margin-top: 20px; font-size: 12px;">
            Sent by AirSense AI — airsense-ai-omega.vercel.app
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ message: 'Alert email sent successfully!' })
  } catch (err) {
    console.error('Email error:', err)
    res.status(500).json({ message: 'Failed to send email' })
  }
})

module.exports = router