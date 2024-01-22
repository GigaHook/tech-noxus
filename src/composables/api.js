import { useFetch, useStorage } from "@vueuse/core"
import { useCookies } from "@vueuse/integrations/useCookies"
import axios from 'axios'

const user = useStorage('user')
const apiToken = useStorage('api-token')
const cookies = useCookies()

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export function useAuth() {
  async function login(formData) {
    await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie')
    const response = await axios.post(import.meta.env.VITE_API_URL + '/login', {
      login: formData.value.login,
      password: formData.value.password,
    })

    user.value = JSON.stringify(response.data.user)
    apiToken.value = response.data.token
  }

  async function logout() {
    await axios.get(import.meta.env.VITE_API_URL + '/logout')
    user.value
    apiToken.value
    cookies.remove('XSRF-TOKEN')
    console.log(user.value)
  }

  async function register() {

  }

  return {
    login,
    logout,
    register,
  }
}

export function useApi() {
  return {
    
  }
}