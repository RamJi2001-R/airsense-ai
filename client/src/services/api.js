import axios from 'axios'

const TOKEN = process.env.REACT_APP_WAQI_TOKEN
const API_URL = process.env.REACT_APP_API_URL

// Fetch Live AQI from WAQI
export const fetchAQI = async (city) => {
  try {
    const response = await axios.get(
      `https://api.waqi.info/feed/${city}/?token=${TOKEN}`
    )
    const data = response.data
    if (data.status === 'ok') {
      return {
        aqi: data.data.aqi,
        city: data.data.city.name,
        dominentPollutant: data.data.dominentpol,
        time: data.data.time.s,
      }
    }
    return null
  } catch (error) {
    console.error('AQI API Error:', error)
    return null
  }
}

// Get ML Forecast
export const getMLForecast = async (aqi) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/ml/forecast/${aqi}`
    )
    return response.data.forecast
  } catch (error) {
    console.error('ML Forecast Error:', error)
    return null
  }
}

// Save AQI Log to Backend
export const saveAQILog = async (userId, city, aqi, dominentPollutant) => {
  try {
    const response = await axios.post(`${API_URL}/api/aqi/save`, {
      userId, city, aqi, dominentPollutant
    })
    return response.data
  } catch (error) {
    console.error('Save Error:', error)
    return null
  }
}

// Get User AQI History
export const getAQIHistory = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/aqi/history/${userId}`
    )
    return response.data
  } catch (error) {
    console.error('History Error:', error)
    return null
  }
}

// Register User
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name, email, password
    })
    return response.data
  } catch (error) {
    console.error('Register Error:', error)
    return null
  }
}

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email, password
    })
    return response.data
  } catch (error) {
    console.error('Login Error:', error)
    return null
  }
}