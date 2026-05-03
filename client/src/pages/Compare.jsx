import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { fetchAQI } from '../services/api'

const Compare = () => {
  const [city1, setCity1] = useState('')
  const [city2, setCity2] = useState('')
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

  const handleCompare = async () => {
    if (!city1.trim() || !city2.trim()) {
      setError('Please enter both city names!')
      return
    }
    setLoading(true)
    setError(null)
    setData(null)

    const [result1, result2] = await Promise.all([
      fetchAQI(city1),
      fetchAQI(city2)
    ])

    if (!result1) {
      setError(`❌ City "${city1}" not found!`)
      setLoading(false)
      return
    }
    if (!result2) {
      setError(`❌ City "${city2}" not found!`)
      setLoading(false)
      return
    }

    setData({ city1: result1, city2: result2 })
    setLoading(false)
  }

  const chartData = data ? [
    {
      name: 'AQI Level',
      [data.city1.city]: data.city1.aqi,
      [data.city2.city]: data.city2.aqi,
    }
  ] : []

  const getWinner = () => {
    if (!data) return null
    return data.city1.aqi < data.city2.aqi ? data.city1.city : data.city2.city
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10 flex flex-col items-center justify-center">

      {/* Header */}
      <h1 className="text-4xl font-bold text-green-400 mb-2 text-center">
        📊 City Comparison
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Compare air quality between two cities
      </p>

      {/* Search Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl w-full justify-center items-center mx-auto">
        <input
          type="text"
          placeholder="First City (e.g. Delhi)"
          value={city1}
          onChange={(e) => setCity1(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400"
        />
        <span className="text-gray-400 text-2xl self-center text-center">VS</span>
        <input
          type="text"
          placeholder="Second City (e.g. Mumbai)"
          value={city2}
          onChange={(e) => setCity2(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400"
        />
        <button
          onClick={handleCompare}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Compare
        </button>
      </div>

      {error && <p className="text-red-400 mb-6 text-center">{error}</p>}

      {loading && (
        <p className="text-green-400 animate-pulse mb-6 text-center">
          🔄 Fetching data...
        </p>
      )}

      {data && (
        <div className="flex flex-col items-center w-full">
          {/* Winner Banner */}
          <div className="bg-green-900 border border-green-500 rounded-2xl p-4 mb-8 max-w-2xl w-full text-center mx-auto">
            <p className="text-green-400 text-xl font-bold">
              🏆 {getWinner()} has cleaner air!
            </p>
          </div>

          {/* AQI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl w-full mx-auto justify-items-center">

            {/* City 1 */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-2">📍 {data.city1.city}</p>
              <p
                className="text-6xl font-bold mt-2"
                style={{ color: getAQIColor(data.city1.aqi) }}
              >
                {data.city1.aqi}
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: getAQIColor(data.city1.aqi) }}
              >
                {getAQILabel(data.city1.aqi)}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                ☁️ {data.city1.dominentPollutant?.toUpperCase()}
              </p>
            </div>

            {/* City 2 */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-2">📍 {data.city2.city}</p>
              <p
                className="text-6xl font-bold mt-2"
                style={{ color: getAQIColor(data.city2.aqi) }}
              >
                {data.city2.aqi}
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: getAQIColor(data.city2.aqi) }}
              >
                {getAQILabel(data.city2.aqi)}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                ☁️ {data.city2.dominentPollutant?.toUpperCase()}
              </p>
            </div>

          </div>

          {/* Bar Chart */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full mb-8 mx-auto flex flex-col items-center">
            <h3 className="text-white text-xl font-bold mb-4 text-center">
              📊 AQI Comparison Chart
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar
                  dataKey={data.city1.city}
                  fill={getAQIColor(data.city1.aqi)}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey={data.city2.city}
                  fill={getAQIColor(data.city2.aqi)}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Difference */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full mx-auto flex flex-col items-center">
            <h3 className="text-white text-xl font-bold mb-3 text-center">
              📈 Difference Analysis
            </h3>
            <p className="text-gray-300 text-center">
              AQI Difference:{' '}
              <span className="text-green-400 font-bold text-xl">
                {Math.abs(data.city1.aqi - data.city2.aqi)} points
              </span>
            </p>
            <p className="text-gray-400 text-sm mt-2 text-center">
              {getWinner()} is{' '}
              {Math.abs(data.city1.aqi - data.city2.aqi)} AQI points
              cleaner than the other city.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Compare