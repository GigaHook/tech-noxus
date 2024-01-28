import { useStorage } from "@vueuse/core"
import { useCookies } from "@vueuse/integrations/useCookies"
import useStore from '@/composables/useStore'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const user = useStorage('user')
const apiToken = useStorage('api-token')

export function useAuth() {
  async function login(formData) {
    const errors = {}
    await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie')
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/login', {
        login: formData.login,
        password: formData.password,
      })
      user.value = JSON.stringify(response.data.user)
      apiToken.value = response.data.token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + apiToken.value
    } catch (error) {
      errors.login = error.response.data.message 
    }

    return errors
  }

  async function logout() {
    await axios.get(import.meta.env.VITE_API_URL + '/logout')
    axios.defaults.headers.common['Authorization'] = null
    user.value = null
    apiToken.value = null
    //cookies.remove('XSRF-TOKEN')
  }

  return {
    login,
    logout,
  }
}

export function usePosts() {
  async function getAll() {
    
  }

  async function create(formData) {
    const errors = {}
    try {
      const response = await axios(import.meta.env.VITE_API_URL + '/posts', {
        data: {
          title: formData.title,
          text: formData.text,
          image: formData.image[0],
        },
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
    } catch (error) {
      Object.assign(errors, error.response.data.errors)
    }

    return errors
  }

  async function update(formData) {

  }

  async function destroy(id) {

  }

  return {
    getAll,
    create,
    update,
    destroy,
  }
}