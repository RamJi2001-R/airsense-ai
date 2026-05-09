import { useState } from 'react'
import CitySearch from '../components/CitySearch'
import AQICard from '../components/AQICard'
import HealthAdvice from '../components/HealthAdvice'
import AlertBanner from '../components/AlertBanner'
import PredictionChart from '../components/PredictionChart'
import { fetchAQI, saveAQILog } from '../services/api'
import { useAQI } from '../context/AQIContext'
import AlertButton from '../components/AlertButton'



const Home = () => {
  const [city, setCity] = useState('')
  const [aqi, setAqi] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAQI()

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive'
    if (aqi <= 200) return 'Unhealthy'
    return 'Hazardous'
  }

  const handleSearch = async (searchedCity) => {
    setLoading(true)
    setError(null)

    const data = await fetchAQI(searchedCity)

    if (data) {
      setCity(data.city)
      setAqi(data.aqi)

      // Save to backend if user is logged in
      if (user) {
        await saveAQILog(user.id, data.city, data.aqi, data.dominentPollutant)
      }
    } else {
      setError('❌ City not found — please try again!')
    }

    setLoading(false)
  }
  

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 text-center">🌍 AirSense AI</h1>
      <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-xl text-center max-w-lg">
        Know how clean your city's air is — and stay safe
      </p>

      <CitySearch onSearch={handleSearch} />

      {loading && (
        <p className="text-green-400 mt-6 text-lg animate-pulse">
          🔄 Loading...
        </p>
      )}

      {error && (
        <p className="text-red-400 mt-6">{error}</p>
      )}

      {aqi !== null && !loading && (
        <>
          <AlertBanner aqi={aqi} />
          <AQICard city={city} aqi={aqi} />
          <AlertButton city={city} aqi={aqi} aqiLabel={AlertBanner.getAQILabel(aqi)} />
          <PredictionChart aqi={aqi} />
          <HealthAdvice aqi={aqi} />
        </>
      )}
    </div>
  )
}

export default Home