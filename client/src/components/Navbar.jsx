import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAQI } from '../context/AQIContext'

const Navbar = () => {
  const { user, logout } = useAQI()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl md:text-2xl font-bold text-green-400">
        🌍 AirSense AI
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-green-400 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-green-400 transition">Dashboard</Link>
        <Link to="/history" className="hover:text-green-400 transition">History</Link>
        <Link to="/about" className="hover:text-green-400 transition">About</Link>
        <Link to="/compare" className="hover:text-green-400 transition">
  Compare
</Link>
        <Link to="/map" className="hover:text-green-400 transition">Map</Link>
        <Link to="/weather" className="hover:text-green-400 transition">
  Weather
</Link>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 md:hidden flex flex-col gap-4 p-4 z-50">
          <Link to="/" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/history" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>History</Link>
          <Link to="/about" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/compare" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
          <Link to="/map" className="hover:text-green-400 transition" onClick={() => setMobileMenuOpen(false)}>Map</Link>
          {user ? (
            <div className="flex flex-col gap-2">
              <span className="text-green-400">👤 {user.name}</span>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition text-center"
              onClick={() => setMobileMenuOpen(false)}
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