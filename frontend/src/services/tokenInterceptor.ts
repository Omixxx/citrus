import axios from 'axios';
import storageManager from '../services/device/storageManager';

export function tokenInterceptorRequest(): any {
  axios.interceptors.request.use(function(config: any) {
    const token = storageManager.getJwtToken();
    config.headers.token = token ? `${token}` : '';
    return config;
  }, function(error) {
    // Do something with request error
    return Promise.reject(error);
  });
  console.log("request")
  return tokenInterceptorRequest
}

export function tokenInterceptorResponse(): any {
  axios.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response")
    return response;
  }, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // Do something with response error
    return Promise.reject(error);
  });
}


