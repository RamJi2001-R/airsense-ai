import { useState } from 'react'

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-2xl text-white font-semibold">
        🔍 Search Your City
      </h2>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter city name... (e.g. Delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400 w-72"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default CitySearch