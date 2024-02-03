import { useStorage } from "@vueuse/core"
import { useAxios } from "@/composables/axios"

const axios = useAxios()

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
  }

  async function logout() {
    await axios.get('/logout')
    user.value = null
    apiToken.value = null
  }

  async function verifySession() {
    if (user.value && !isSessionVerified) {
      isSessionVerified = true
      try {
        await axios.post('/user')
        console.log('Session has been continued.')
      } catch (error) {
        user.value = null
        apiToken.value = null
        console.log('Session has ended. Log in again.')
      }
    }
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
      const response = await axios.post('/posts', {
        title: formData.title,
        text: formData.text,
        image: formData.image[0],
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      Object.assign(errors, error.response?.data.errors)
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