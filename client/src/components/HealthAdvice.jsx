const HealthAdvice = ({ aqi }) => {

  const getAdvice = (aqi) => {
    if (aqi <= 50) return {
      title: 'Air Quality is Good! 😊',
      color: 'border-green-500',
      titleColor: 'text-green-400',
      tips: [
        '✅ You can exercise outdoors',
        '✅ Windows can be kept open',
        '✅ Children can play outside',
        '✅ No precautions needed',
      ]
    }
    if (aqi <= 100) return {
      title: 'Air Quality is Moderate 😐',
      color: 'border-yellow-500',
      titleColor: 'text-yellow-400',
      tips: [
        '⚠️ Sensitive groups should limit outdoor time',
        '⚠️ Avoid heavy outdoor exercise',
        '✅ Acceptable for general public',
        '⚠️ Asthma patients should take care',
      ]
    }
    if (aqi <= 150) return {
      title: 'Unhealthy for Sensitive Groups 😷',
      color: 'border-orange-500',
      titleColor: 'text-orange-400',
      tips: [
        '❌ Children should not go outside',
        '❌ Elderly people should stay indoors',
        '⚠️ Wear a mask when going out',
        '⚠️ Keep windows closed',
      ]
    }
    if (aqi <= 200) return {
      title: 'Air Quality is Unhealthy 🤢',
      color: 'border-red-500',
      titleColor: 'text-red-400',
      tips: [
        '❌ Avoid going outside',
        '❌ No outdoor exercise at all',
        '✅ Use air purifier indoors',
        '✅ N95 mask is necessary',
      ]
    }
    return {
      title: 'Hazardous! Stay Indoors ☠️',
      color: 'border-purple-500',
      titleColor: 'text-purple-400',
      tips: [
        '🚨 Do not go outside at all',
        '🚨 Seal all doors and windows',
        '🚨 Run air purifier on HIGH mode',
        '🚨 Consult a doctor if you feel unwell',
      ]
    }
  }

  const advice = getAdvice(aqi)

  return (
    <div className={`border ${advice.color} bg-gray-900 rounded-2xl p-4 sm:p-6 mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto`}>
      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${advice.titleColor}`}>
        {advice.title}
      </h3>
      <ul className="flex flex-col gap-2">
        {advice.tips.map((tip, index) => (
          <li key={index} className="text-gray-300 text-xs sm:text-sm">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HealthAdvice