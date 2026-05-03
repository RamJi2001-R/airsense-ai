const AQICard = ({ city, aqi }) => {

  const getAQIInfo = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-400', bg: 'bg-green-900', emoji: '😊' }
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-900', emoji: '😐' }
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'text-orange-400', bg: 'bg-orange-900', emoji: '😷' }
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-900', emoji: '🤢' }
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-400', bg: 'bg-purple-900', emoji: '☠️' }
    return { label: 'Hazardous', color: 'text-red-600', bg: 'bg-red-950', emoji: '💀' }
  }

  const info = getAQIInfo(aqi)

  return (
    <div className={`${info.bg} border border-gray-700 rounded-2xl p-8 mt-8 text-center w-80`}>
      <h3 className="text-gray-300 text-lg mb-2">📍 {city}</h3>
      <p className="text-7xl font-bold text-white">{aqi}</p>
      <p className={`text-2xl font-semibold mt-2 ${info.color}`}>
        {info.emoji} {info.label}
      </p>
      <p className="text-gray-400 text-sm mt-3">AQI Index</p>
    </div>
  )
}

export default AQICard