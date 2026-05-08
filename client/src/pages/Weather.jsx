import { useState } from 'react'
import { fetchAQI, fetchWeather } from '../services/api'

const Weather = () => {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#34D399'
    if (aqi <= 100) return '#FBBF24'
    if (aqi <= 150) return '#F97316'
    if (aqi <= 200) return '#EF4444'
    return '#A855F7'
  }

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return '😊 Good'
    if (aqi <= 100) return '😐 Moderate'
    if (aqi <= 150) return '😷 Unhealthy for Sensitive'
    if (aqi <= 200) return '🤢 Unhealthy'
    return '☠️ Hazardous'
  }

  const getWeatherAdvice = (temp, aqi) => {
    if (aqi > 150 && temp > 35) return {
      text: '🚨 Extreme heat + poor air quality — stay indoors!',
      color: 'text-red-400'
    }
    if (aqi > 150) return {
      text: '😷 Poor air quality — wear mask if going out!',
      color: 'text-orange-400'
    }
    if (temp > 35) return {
      text: '🌡️ Very hot outside — stay hydrated!',
      color: 'text-yellow-400'
    }
    if (aqi <= 50 && temp < 30) return {
      text: '✅ Great conditions for outdoor activities!',
      color: 'text-green-400'
    }
    return {
      text: '⚠️ Moderate conditions — take necessary precautions!',
      color: 'text-yellow-400'
    }
  }

  const handleSearch = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)
    setData(null)

    const [aqiResult, weatherResult] = await Promise.all([
      fetchAQI(city),
      fetchWeather(city)
    ])

    if (!aqiResult || !weatherResult) {
      setError('❌ City not found — please try again!')
      setLoading(false)
      return
    }

    setData({ aqi: aqiResult, weather: weatherResult })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-8 py-10">

      {/* Header */}
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          🌦️ Weather + AQI
        </h1>
        <p className="text-gray-400">
          Complete environmental overview for any city
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3 w-full max-w-2xl mb-8">
        <input
          type="text"
          placeholder="Enter city name... (e.g. Delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      {loading && (
        <p className="text-green-400 animate-pulse mb-6">
          🔄 Fetching weather + AQI data...
        </p>
      )}

      {data && (
        <>
          {/* Combined Advice Banner */}
          {(() => {
            const advice = getWeatherAdvice(data.weather.temp, data.aqi.aqi)
            return (
              <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl p-4 mb-6 text-center">
                <p className={`text-lg font-semibold ${advice.color}`}>
                  {advice.text}
                </p>
              </div>
            )
          })()}

          {/* Main Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-6">

            {/* Weather Card */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-4">
                🌤️ Weather
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
                  alt="weather icon"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-5xl font-bold text-white">
                    {Math.round(data.weather.temp)}°C
                  </p>
                  <p className="text-gray-400 capitalize">
                    {data.weather.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs">Feels Like</p>
                  <p className="text-white font-bold">
                    {Math.round(data.weather.feelsLike)}°C
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs">Humidity</p>
                  <p className="text-white font-bold">
                    {data.weather.humidity}%
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs">Wind Speed</p>
                  <p className="text-white font-bold">
                    {data.weather.windSpeed} m/s
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs">City</p>
                  <p className="text-white font-bold text-sm">
                    {data.weather.city}
                  </p>
                </div>
              </div>
            </div>

            {/* AQI Card */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-4">
                🌫️ Air Quality
              </h3>
              <div className="text-center mt-4">
                <p
                  className="text-7xl font-bold"
                  style={{ color: getAQIColor(data.aqi.aqi) }}
                >
                  {data.aqi.aqi}
                </p>
                <p
                  className="text-xl mt-2"
                  style={{ color: getAQIColor(data.aqi.aqi) }}
                >
                  {getAQILabel(data.aqi.aqi)}
                </p>
                <p className="text-gray-400 text-sm mt-2">AQI Index</p>
                {data.aqi.dominentPollutant && (
                  <div className="bg-gray-800 rounded-xl p-3 mt-4">
                    <p className="text-gray-400 text-xs">Main Pollutant</p>
                    <p className="text-white font-bold">
                      ☁️ {data.aqi.dominentPollutant.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Health Impact Table */}
          <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">
              💊 Combined Health Impact
            </h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  condition: 'Outdoor Exercise',
                  status: data.aqi.aqi <= 100 && data.weather.temp <= 35
                    ? '✅ Safe'
                    : '❌ Avoid',
                  color: data.aqi.aqi <= 100 && data.weather.temp <= 35
                    ? 'text-green-400'
                    : 'text-red-400'
                },
                {
                  condition: 'Open Windows',
                  status: data.aqi.aqi <= 100 ? '✅ Safe' : '❌ Keep Closed',
                  color: data.aqi.aqi <= 100 ? 'text-green-400' : 'text-red-400'
                },
                {
                  condition: 'Children Outdoors',
                  status: data.aqi.aqi <= 100 && data.weather.temp <= 38
                    ? '✅ Safe'
                    : '❌ Not Recommended',
                  color: data.aqi.aqi <= 100 && data.weather.temp <= 38
                    ? 'text-green-400'
                    : 'text-red-400'
                },
                {
                  condition: 'Mask Required',
                  status: data.aqi.aqi > 150 ? '😷 Yes' : '✅ No',
                  color: data.aqi.aqi > 150 ? 'text-orange-400' : 'text-green-400'
                },
              ].map((item) => (
                <div
                  key={item.condition}
                  className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3"
                >
                  <p className="text-gray-300">{item.condition}</p>
                  <p className={`font-semibold ${item.color}`}>{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather