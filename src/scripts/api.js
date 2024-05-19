import { useStorage } from "@vueuse/core"
import { useRouter } from "vue-router"
import useAxios from "@/scripts/axios"

const axios = useAxios()

export function useAuth() {
  const router = useRouter()
  const user = useStorage('user')
  let isSessionVerified = false

  async function login(formData) {
    await axios.get('/sanctum/csrf-cookie')
    const { data } = await axios.post('/login', {
      login: formData.login,
      password: formData.password,
    })
    user.value = JSON.parse(data.user)
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
  async function createPost(formData) {
    await axios.post('/posts', {
      title: formData.title,
      text:  formData.text,
      image: formData.image[0],
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async function updatePost(id, formData) {
    await axios.update('/posts', {
      id:    id,
      title: formData.title ?? null,
      text:  formData.text ?? null,
      image: formData.image[0] ?? null,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async function deletePost(id) {
    await axios.delete('/posts', {
      id: id
    })
  }

  return {
    createPost,
    updatePost,
    deletePost,
  }
}