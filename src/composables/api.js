import { useStorage } from "@vueuse/core"
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export function useAuth() {
  const user = useStorage('user')
  const apiToken = useStorage('api-token', null)
  let isSessionVerified = false

  async function login(formData) {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/login', {
      login: formData.login,
      password: formData.password,
    })
    user.value = JSON.stringify(data.user)
    apiToken.value = data.token
    storeApiToken()
  }

  async function logout() {
    await axios.get('/logout')
    removeApiToken()
    user.value = null
    apiToken.value = null
  }

  //TODO clear smt 
  async function verifySession() {
    if (user.value && !isSessionVerified) {
      isSessionVerified = true
      storeApiToken()
      try {
        const { data } = await axios.get('/user')
        console.log('Session has been continued.')
      } catch (error) {
        console.log('Session has ended. Log in again.')
        user.value = null
        apiToken.value = null
        removeApiToken()
      }
    }
  }

  function storeApiToken() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken.value}`
  }

  function removeApiToken() {
    axios.defaults.headers.common['Authorization'] = null
  }

  return {
    login,
    logout,
    verifySession,
  }
}

export function usePosts() {
  async function getAll() {
    
  }

  async function create(formData) {
    const errors = {}
    try {
      const response = await axios('/posts', {
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