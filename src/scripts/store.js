import { reactive } from "vue"
import { gsap } from "gsap/all"
import { createSharedComposable } from "@vueuse/core"

const store = reactive({
  selectedCourse: null,
  heroBtn: null,
})

//const sharedStore = createSharedComposable()

export default function useStore() {
  return store
}