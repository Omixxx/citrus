import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function Boot () {
  const { isAuth, isLoading } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (isLoading) return

    isAuth ? history.replace('/home') : history.replace('/login')
  }, [isLoading, isAuth])

  return (
    <>
      <p>Loading....</p>
    </>
  )
}
