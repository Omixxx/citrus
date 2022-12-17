import storageManager from '../services/device/storageManager'

export function isAuthenticated(): boolean {
  const axios = require('axios')
  const token = storageManager.getJwtToken()
  console.log(` token: ${token}`)
  if (token === null || token === undefined) { return false; }
  return axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/isAuthenticated`, { token: token })
}

