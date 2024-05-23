import { createGlobalState, useStorage } from '@vueuse/core'
import { ref, shallowRef, reactive } from 'vue'

export const useLocalStorage = createGlobalState(() => useStorage('store', {}))

export const useState = createGlobalState(() => { 
  const isHeroBtnVisible = shallowRef(true)
  const timelines = shallowRef([])
  const selectedCourse = shallowRef()
  const postBeingEdited = ref(null)

  return {
    isHeroBtnVisible,
    timelines,
    selectedCourse,
    postBeingEdited,
  } 
})