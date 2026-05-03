import { createContext, useContext, useState } from 'react'

const AQIContext = createContext()

export const AQIProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  )

  const login = (userData, tokenData) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenData)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AQIContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AQIContext.Provider>
  )
}

export const useAQI = () => useContext(AQIContext)