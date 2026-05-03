import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { fetchAQI } from '../services/api'

const MAJOR_CITIES = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538 },
  { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
]

const Map = () => {
  const [cityData, setCityData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

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

  const loadAllCities = async () => {
    setLoading(true)
    const results = await Promise.all(
      MAJOR_CITIES.map(async (city) => {
        const data = await fetchAQI(city.name)
        return {
          ...city,
          aqi: data ? data.aqi : null,
          fullName: data ? data.city : city.name,
          pollutant: data ? data.dominentPollutant : null,
        }
      })
    )
    setCityData(results.filter((c) => c.aqi !== null))
    setLoaded(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 sm:py-10">

      {/* Header */}
      <div className="w-full max-w-5xl mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-2">
          🗺️ Live AQI Map
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Real-time air quality across major Indian cities
        </p>
      </div>

      {/* Load Button */}
      {!loaded && (
        <div className="w-full max-w-5xl mb-6">
          <button
            onClick={loadAllCities}
            className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-8 py-3 rounded-lg font-semibold transition text-sm w-full sm:w-auto"
          >
            {loading ? '🔄 Loading cities...' : '🗺️ Load Live AQI Map'}
          </button>
        </div>
      )}

      {/* Legend */}
      {loaded && (
        <div className="w-full max-w-5xl mb-4 flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
          {[
            { label: 'Good (0-50)', color: '#34D399' },
            { label: 'Moderate (51-100)', color: '#FBBF24' },
            { label: 'Unhealthy Sensitive (101-150)', color: '#F97316' },
            { label: 'Unhealthy (151-200)', color: '#EF4444' },
            { label: 'Hazardous (200+)', color: '#A855F7' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2\">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300 text-xs sm:text-sm\">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Map */}
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-700">
        <MapContainer
          center={[22.5, 80.0]}
          zoom={5}
          style={{ height: window.innerWidth < 640 ? '400px' : '550px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />

          {cityData.map((city) => (
            <CircleMarker
              key={city.name}
              center={[city.lat, city.lng]}
              radius={20}
              fillColor={getAQIColor(city.aqi)}
              color={getAQIColor(city.aqi)}
              fillOpacity={0.7}
              weight={2}
            >
              <Popup>
                <div style={{
                  backgroundColor: '#1F2937',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  minWidth: '150px'
                }}>
                  <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    📍 {city.fullName}
                  </p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: getAQIColor(city.aqi)
                  }}>
                    {city.aqi}
                  </p>
                  <p style={{ color: getAQIColor(city.aqi) }}>
                    {getAQILabel(city.aqi)}
                  </p>
                  {city.pollutant && (
                    <p style={{ color: '#9CA3AF', fontSize: '12px' }}>
                      ☁️ {city.pollutant.toUpperCase()}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* City Cards Below Map */}
      {loaded && (
        <div className="w-full max-w-5xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cityData.map((city) => (
            <div
              key={city.name}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center"
            >
              <p className="text-gray-400 text-sm">📍 {city.name}</p>
              <p
                className="text-3xl font-bold mt-1"
                style={{ color: getAQIColor(city.aqi) }}
              >
                {city.aqi}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: getAQIColor(city.aqi) }}
              >
                {getAQILabel(city.aqi)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Map