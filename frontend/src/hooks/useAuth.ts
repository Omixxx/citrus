import axios from 'axios'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  /*
   * Ogni volta che viene montato il componente,
   * Viene eseguito il codice all'interno di useEffect
   *
   */
  useEffect(() => {
    const checkAuth = () => {
      axios
        .get(
          `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/user/isAuth`
        )
        .then(() => {
          setIsAuth(true)
        })
        .catch((err) => {
          alert(`Error during authentication${err}`)
          setIsAuth(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    checkAuth()
  }, [])

  return {
    isAuth,
    isLoading
  }
}
