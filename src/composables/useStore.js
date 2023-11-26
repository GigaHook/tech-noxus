import { reactive } from "vue"

const store = reactive({
  hero: null,
  about: null,
  timetable: null,
  courses: null,
  map: null,
  form: null,
  partners: null,
})

export default function useStore() {
  return store
}