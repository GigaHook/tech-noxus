import { reactive } from "vue"
import { gsap } from "gsap/all"

const store = reactive({
  selectedCourse: null,
  heroBtn: null,
  masterTl: gsap.timeline(),
})

export default function useStore() {
  return store
}