import { useFetch, useStorage } from "@vueuse/core"
import useStore from '@/composables/useStore'
import { useCookies } from "@vueuse/integrations/useCookies"
import axios from 'axios'

const user = useStorage('user')
const apiToken = useStorage('api-token')
const cookies = useCookies()
const store = useStore()

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export function useAuth() {
  async function login(formData) {
    const errors = {}
    await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie')
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/login', {
        login: formData.value.login,
        password: formData.value.password,
      })
      user.value = JSON.stringify(response.data.user)
      store.user = user
      apiToken.value = response.data.token    
    } catch (error) {
      errors.login = error.response.data.message 
    }

    return errors
  }

  async function logout() {
    await axios.get(import.meta.env.VITE_API_URL + '/logout')
    store.user = null
    user.value = null
    apiToken.value = null
    cookies.remove('XSRF-TOKEN')
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