import { useState, useEffect } from 'react'
import { useAQI } from '../context/AQIContext'
import { getAQIHistory } from '../services/api'

const History = () => {
  const { user } = useAQI()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchHistory()
    }
  }, [user])

  const fetchHistory = async () => {
    setLoading(true)
    const data = await getAQIHistory(user.id)
    if (data) setHistory(data)
    setLoading(false)
  }

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-400'
    if (aqi <= 100) return 'text-yellow-400'
    if (aqi <= 150) return 'text-orange-400'
    if (aqi <= 200) return 'text-red-400'
    return 'text-purple-400'
  }

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive'
    if (aqi <= 200) return 'Unhealthy'
    return 'Hazardous'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">🔒 Please login to view history</p>
          <a href="/login" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">
      <h1 className="text-4xl font-bold text-green-400 mb-2">📜 Search History</h1>
      <p className="text-gray-400 mb-8">Your recent AQI searches</p>

      {loading && (
        <p className="text-green-400 animate-pulse">🔄 Loading history...</p>
      )}

      {!loading && history.length === 0 && (
        <p className="text-gray-400">No history found — search a city first!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((log) => (
          <div
            key={log._id}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              📍 {log.city}
            </h3>
            <p className={`text-4xl font-bold ${getAQIColor(log.aqi)}`}>
              {log.aqi}
            </p>
            <p className={`text-sm mt-1 ${getAQIColor(log.aqi)}`}>
              {getAQILabel(log.aqi)}
            </p>
            <p className="text-gray-500 text-xs mt-3">
              🕒 {new Date(log.savedAt).toLocaleString()}
            </p>
            {log.dominentPollutant && (
              <p className="text-gray-400 text-xs mt-1">
                ☁️ Main Pollutant: {log.dominentPollutant.toUpperCase()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default History