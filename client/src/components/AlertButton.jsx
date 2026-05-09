import { useState } from 'react'
import { sendAlertEmail } from '../services/api'
import { useAQI } from '../context/AQIContext'

const AlertButton = ({ city, aqi, aqiLabel }) => {
  const { user } = useAQI()
  const [email, setEmail] = useState(user?.email || '')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Browser Notification
  const sendBrowserAlert = () => {
    if (!('Notification' in window)) {
      alert('Browser notifications not supported!')
      return
    }
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(`🚨 AQI Alert — ${city}`, {
          body: `Current AQI: ${aqi} — ${aqiLabel}`,
          icon: '/favicon.ico'
        })
      }
    })
  }

  // Email Alert
  const handleEmailAlert = async () => {
    if (!email.trim()) return
    setLoading(true)
    const result = await sendAlertEmail(email, city, aqi, aqiLabel)
    if (result) {
      setSuccess(true)
      setShowForm(false)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-2xl mt-4">

      {/* Alert Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={sendBrowserAlert}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          🔔 Browser Alert
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          📧 Email Alert
        </button>
      </div>

      {/* Email Form */}
      {showForm && (
        <div className="mt-4 bg-gray-900 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-300 text-sm mb-3">
            Send AQI alert to your email:
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400 text-sm"
            />
            <button
              onClick={handleEmailAlert}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {loading ? '🔄 Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <p className="text-green-400 text-sm mt-3">
          ✅ Alert email sent successfully!
        </p>
      )}
    </div>
  )
}

export default AlertButton