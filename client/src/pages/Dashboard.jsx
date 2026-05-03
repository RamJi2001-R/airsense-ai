import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAQI } from '../context/AQIContext'
import { fetchAQI, getAQIHistory } from '../services/api'
import PredictionChart from '../components/PredictionChart'

const Dashboard = () => {
  const { user } = useAQI()
  const [aqi, setAqi] = useState(null)
  const [city, setCity] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadDashboard()
    }
  }, [user])

  const loadDashboard = async () => {
    setLoading(true)
    const logs = await getAQIHistory(user.id)
    if (logs && logs.length > 0) {
      setHistory(logs.slice(0, 5))
      const lastCity = logs[0].city
      const data = await fetchAQI(lastCity)
      if (data) {
        setCity(data.city)
        setAqi(data.aqi)
      }
    }
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
    if (aqi <= 50) return '😊 Good'
    if (aqi <= 100) return '😐 Moderate'
    if (aqi <= 150) return '😷 Unhealthy for Sensitive'
    if (aqi <= 200) return '🤢 Unhealthy'
    return '☠️ Hazardous'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">
            🔒 Please login to view dashboard
          </p>
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">

      {/* Header */}
      <h1 className="text-4xl font-bold text-green-400 mb-1">
        📊 Dashboard
      </h1>
      <p className="text-gray-400 mb-8">Welcome back, {user.name}!</p>

      {loading && (
        <p className="text-green-400 animate-pulse mb-6">
          🔄 Loading dashboard...
        </p>
      )}

      {!loading && aqi === null && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center max-w-md">
          <p className="text-gray-400 text-lg">No data yet!</p>
          <p className="text-gray-500 text-sm mt-2">
            Search a city on Home page to see your dashboard
          </p>
          <Link
            to="/"
            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition"
          >
            Search Now
          </Link>
        </div>
      )}

      {!loading && aqi !== null && (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Current AQI */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">📍 Current City</p>
              <p className="text-white text-xl font-bold">{city}</p>
              <p className={`text-5xl font-bold mt-3 ${getAQIColor(aqi)}`}>
                {aqi}
              </p>
              <p className={`text-sm mt-2 ${getAQIColor(aqi)}`}>
                {getAQILabel(aqi)}
              </p>
            </div>

            {/* Total Searches */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">🔍 Total Searches</p>
              <p className="text-5xl font-bold text-green-400 mt-3">
                {history.length}
              </p>
              <p className="text-gray-400 text-sm mt-2">Cities Tracked</p>
            </div>

            {/* Last Search */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">🕒 Last Search</p>
              <p className="text-white text-xl font-bold mt-3">
                {history.length > 0
                  ? new Date(history[0].savedAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {history.length > 0
                  ? new Date(history[0].savedAt).toLocaleTimeString()
                  : ''}
              </p>
            </div>

          </div>

          {/* Prediction Chart */}
          <div className="mb-8">
            <PredictionChart aqi={aqi} />
          </div>

          {/* Recent History Table */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              📜 Recent Searches
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">City</th>
                  <th className="text-left py-3">AQI</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((log) => (
                  <tr
                    key={log._id}
                    className="border-b border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 text-white">📍 {log.city}</td>
                    <td className={`py-3 font-bold ${getAQIColor(log.aqi)}`}>
                      {log.aqi}
                    </td>
                    <td className={`py-3 ${getAQIColor(log.aqi)}`}>
                      {getAQILabel(log.aqi)}
                    </td>
                    <td className="py-3 text-gray-400">
                      {new Date(log.savedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard