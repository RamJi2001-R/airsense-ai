import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAQI } from '../context/AQIContext'

const Navbar = () => {
  const { user, logout } = useAQI()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">

      {/* Top Row */}
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400">
          🌍 AirSense AI
        </Link>

        {/* Hamburger Button — mobile only */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-green-400 transition">Dashboard</Link>
          <Link to="/compare" className="hover:text-green-400 transition">Compare</Link>
          <Link to="/map" className="hover:text-green-400 transition">Map</Link>
          <Link to="/weather" className="hover:text-green-400 transition">Weather</Link>
          <Link to="/history" className="hover:text-green-400 transition">History</Link>
          <Link to="/about" className="hover:text-green-400 transition">About</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-green-400">👤 {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 border-t border-gray-700 pt-4">
          <Link to="/" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/dashboard" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>📊 Dashboard</Link>
          <Link to="/compare" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>📈 Compare</Link>
          <Link to="/map" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>🗺️ Map</Link>
          <Link to="/weather" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>🌦️ Weather</Link>
          <Link to="/history" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>📜 History</Link>
          <Link to="/about" className="hover:text-green-400 transition" onClick={() => setMenuOpen(false)}>ℹ️ About</Link>

          {user ? (
            <div className="flex flex-col gap-3 border-t border-gray-700 pt-3">
              <span className="text-green-400">👤 {user.name}</span>
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar