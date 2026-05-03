import { useState } from 'react'

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8 sm:mt-10 w-full px-2 sm:px-0">
      <h2 className="text-lg sm:text-xl md:text-2xl text-white font-semibold text-center">
        🔍 Search Your City
      </h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto max-w-lg">
        <input
          type="text"
          placeholder="Enter city name... (e.g. Delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400 flex-1 sm:w-72 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default CitySearch