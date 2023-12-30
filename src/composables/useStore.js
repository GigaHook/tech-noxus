import { reactive } from "vue"

const store = reactive({
  selectedCourse: null,
  heroBtn: null,
})

export default function useStore() {
  return store
}