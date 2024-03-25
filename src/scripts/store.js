import { reactive } from "vue"
import { gsap } from "gsap/all"
import { createSharedComposable } from "@vueuse/core"

const store = reactive({
  selectedCourse: null,
  heroBtn: null,
  yMapData: null,
})

function useStoreFn() {
  return store
}

const useStore = createSharedComposable(useStoreFn)

export default useStore