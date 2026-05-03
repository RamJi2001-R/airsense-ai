import { Link } from 'react-router-dom'
import { useAQI } from '../context/AQIContext'

const Navbar = () => {
  const { user, logout } = useAQI()

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-400">
        🌍 AirSense AI
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-400 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-green-400 transition">Dashboard</Link>
        <Link to="/history" className="hover:text-green-400 transition">History</Link>
        <Link to="/about" className="hover:text-green-400 transition">About</Link>
        <Link to="/compare" className="hover:text-green-400 transition">
  Compare
</Link>
        <Link to="/map" className="hover:text-green-400 transition">Map</Link>
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
    </nav>
  )
}

export default Navbar