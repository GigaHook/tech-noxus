import Axios from 'axios'

export function useAxios() {
  const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: "application/json",
    },
    
  })

  axios.interceptors.response.use(null, err => {
    console.log(err)
    return Promise.reject(err)
  })

  return axios
}