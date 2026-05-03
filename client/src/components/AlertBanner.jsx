const AlertBanner = ({ aqi }) => {

  if (aqi <= 100) return null

  const getAlert = (aqi) => {
    if (aqi <= 150) return {
      message: '⚠️ Air is unhealthy for sensitive groups — take precautions!',
      bg: 'bg-orange-600'
    }
    if (aqi <= 200) return {
      message: '🚨 Air quality is unhealthy — avoid going outside!',
      bg: 'bg-red-600'
    }
    return {
      message: '☠️ HAZARDOUS! Do not go outside — emergency alert!',
      bg: 'bg-purple-700'
    }
  }

  const alert = getAlert(aqi)

  return (
    <div className={`${alert.bg} text-white text-center py-2 sm:py-3 px-4 sm:px-6 rounded-xl mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto font-semibold animate-pulse text-sm sm:text-base`}>
      {alert.message}
    </div>
  )
}

export default AlertBanner