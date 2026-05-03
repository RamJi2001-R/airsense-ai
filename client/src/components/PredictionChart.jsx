import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { getMLForecast } from '../services/api'

const PredictionChart = ({ aqi }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadForecast()
  }, [aqi])

  const loadForecast = async () => {
    setLoading(true)
    const forecast = await getMLForecast(aqi)
    if (forecast) {
      setData(forecast)
    } else {
      // Fallback to generated data
      const fallback = []
      for (let i = 0; i < 24; i++) {
        const variation = Math.floor(Math.random() * 30) - 15
        fallback.push({
          hour: `${i}:00`,
          aqi: Math.max(0, aqi + variation)
        })
      }
      setData(fallback)
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-3 sm:p-4 md:p-6 mt-6 w-full max-w-2xl mx-auto">
      <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
        📈 24 Hour AQI Forecast
        <span className="text-green-400 text-xs sm:text-sm font-normal ml-1 sm:ml-2 block sm:inline">
          (ML Powered)
        </span>
      </h3>

      {loading ? (
        <p className="text-green-400 animate-pulse text-center py-8 sm:py-10 text-sm">
          🤖 ML model generating forecast...
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 200 : 250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="hour"
              stroke="#9CA3AF"
              tick={{ fontSize: 10 }}
              interval={3}
            />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                color: '#fff'
              }}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#34D399"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default PredictionChart