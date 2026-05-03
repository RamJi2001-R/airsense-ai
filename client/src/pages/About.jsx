const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-2 text-center">
        🌍 About AirSense AI
      </h1>
      <p className="text-gray-400 mb-8 sm:mb-10 text-center text-sm sm:text-base">
        AI-powered air quality monitoring and prediction platform
      </p>

      {/* What is AirSense */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-3xl text-center text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is AirSense AI?</h2>
        <p className="text-gray-300 leading-relaxed">
          AirSense AI is a real-time air quality monitoring platform that uses 
          Machine Learning to predict future AQI levels. It helps people make 
          informed decisions about outdoor activities and health precautions 
          based on live air quality data.
        </p>
      </div>

      {/* Problem We Solve */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-3xl text-center text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">🎯 Problem We Solve</h2>
        <p className="text-gray-300 leading-relaxed">
          9 out of 10 cities in India exceed WHO air quality standards. 
          Most people don't understand AQI levels or their health impact. 
          AirSense AI bridges this gap with real-time data, predictions, 
          and personalized health advice.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-3xl mx-auto text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">🛠️ Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 justify-items-center">
          {[
            { label: 'Frontend', value: 'React.js + Tailwind CSS', icon: '⚛️' },
            { label: 'Backend', value: 'Node.js + Express', icon: '🖥️' },
            { label: 'Database', value: 'MongoDB Atlas', icon: '🍃' },
            { label: 'ML Service', value: 'Python + FastAPI', icon: '🤖' },
            { label: 'AQI Data', value: 'WAQI API', icon: '📡' },
            { label: 'Auth', value: 'JWT Tokens', icon: '🔐' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-xl p-3 sm:p-4 text-center w-full">
              <p className="text-xl sm:text-2xl mb-1">{item.icon}</p>
              <p className="text-green-400 font-semibold text-xs sm:text-sm">{item.label}</p>
              <p className="text-gray-300 text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-6 max-w-3xl text-center mx-auto text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">✨ Features</h2>
        <ul className="flex flex-col gap-2 sm:gap-3 items-center">
          {[
            '🔍 Real-time AQI search for any city',
            '📈 24-hour AQI prediction chart',
            '💊 Personalized health advice based on AQI',
            '🚨 Emergency alerts for hazardous air',
            '📜 Search history saved to your account',
            '🤖 ML-powered AQI forecasting',
          ].map((feature, index) => (
            <li key={index} className="text-gray-300 flex items-center gap-2 text-xs sm:text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default About