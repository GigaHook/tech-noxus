import { useStorage } from "@vueuse/core"
import { useAxios } from "@/composables/axios"
import { useRouter } from "vue-router"

const axios = useAxios()
const router = useRouter()

export function useAuth() {
  const user = useStorage('user')
  let isSessionVerified = false

  async function login(formData) {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/login', {
      login: formData.login,
      password: formData.password,
    })
    user.value = JSON.stringify(data.user)
  }

  async function logout() {
    await axios.get('/logout')
    user.value = null
  }

  async function verifySession() {
    if (user.value && !isSessionVerified) {
      isSessionVerified = true
      try {
        await axios.get('/user')
      } catch (error) {
        user.value = null
        router.push('/login')
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
    await axios.post('/posts', {
      title: formData.title,
      text: formData.text,
      image: formData.image[0],
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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