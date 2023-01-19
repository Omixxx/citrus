import { getJwt } from './jwt'
import axios from 'axios'

export function tokenInterceptorRequest (): any {
  axios.interceptors.request.use(
    async (config: any) => {
      const token = await getJwt()
      config.headers.authorization = token
      return config
    },
    async function (error) {
      // Do something with request error
      return await Promise.reject(error)
    }
  )
  return tokenInterceptorRequest
}

export function tokenInterceptorResponse (): any {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      return await Promise.reject(error)
    }
  )
}
