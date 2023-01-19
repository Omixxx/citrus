import axios from 'axios'
import { storeJwt } from '../../services/jwt'

export function login (email: string, password: string, history: any) {
  axios
    .post(
      ` http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/user/login`,
      {
        email,
        password
      }
    )
    .then((res) => {
      alert(`User logged in successfully ${res.status}`)
      storeJwt(res.data.token)
      history.replace('/home')
    })
    .catch((err) => {
      alert(err.message)
    })
}
