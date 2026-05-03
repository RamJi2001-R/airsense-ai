import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAQI } from '../context/AQIContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAQI()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const data = await loginUser(email, password)

    if (data && data.token) {
      login(data.user, data.token)
      navigate('/')
    } else {
      setError('❌ Invalid email or password!')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-6">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 sm:p-8 w-full max-w-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-6 text-center">
          🌍 Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400 text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400 text-sm"
        />

        {error && <p className="text-red-400 text-xs sm:text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition text-sm"
        >
          {loading ? '🔄 Logging in...' : 'Login'}
        </button>

        <p className="text-gray-400 text-xs sm:text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login