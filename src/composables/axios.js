import Axios from 'axios'
import { useStorage } from '@vueuse/core'

export function useAxios() {
  const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: "application/json"
    },
  })

  axios.interceptors.request.use(config => {
    const apiToken = useStorage('api-token', null)

    if (apiToken.value) {
      config.headers['Authorization'] = `Bearer ${apiToken.value}`
    }
    
    return config
  })

  axios.interceptors.response.use(null, err => {
    console.log(err)
    return Promise.reject(err)
  })

  return axios
}