import { useLocalStorage } from "@/scripts/store"
import { useAxios } from "@/scripts/axios"
import { computed } from "vue"
import { createSharedComposable } from "@vueuse/core"

const axios = useAxios()

export const useAuth = createSharedComposable(() => {
  const store = useLocalStorage()
  const user = computed({
    get: () => store.value.user,
    set: value => store.value.user = value,
  })

  async function login(formData) {
    const { data } = await axios.post('/login', formData)
    user.value = data.user
  }

  async function logout() {
    await axios.get('/logout')
    user.value = null
  }

  async function verifySession() {
    await axios.get('/sanctum/csrf-cookie')
    if (user.value) {
      try {
        await axios.get('/user')
      } catch (error) {
        store.value.user = null
      }
    }
  }

  return {
    user,
    login,
    logout,
    verifySession,
  }
})

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
    const { data } = await axios.patch('/posts/' + id, {
      title: formData.title,
      text:  formData.text,
      image: formData.image?.[0],
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(data)
  }

  async function deletePost(id) {
    await axios.delete('/posts/' + id)
  }

  return {
    createPost,
    updatePost,
    deletePost,
  }
}