import { reactive } from "vue"

const store = reactive({
  selectedCourse: null,
  homeSections: null,
  homeMenuItems: null,
  partnersSections: null,
  partnersMenuItems: null,
})

export default function useStore() {
  return store
}