import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Compare from './pages/Compare'
import Map from './pages/Map'
import Weather from './pages/Weather'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/map" element={<Map />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  )
}

export default App