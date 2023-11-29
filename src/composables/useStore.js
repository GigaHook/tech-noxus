import { reactive } from "vue"

const store = reactive({
  selectedCourse: null
})

export default function useStore() {
  return store
}