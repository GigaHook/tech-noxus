import { useAnimations } from "@/scripts/animations"
import { breakpointsTailwind, useBreakpoints, useElementSize  } from '@vueuse/core'
import { gsap, ScrollTrigger } from 'gsap/all'
import { watch } from "vue"

const timelines = []
const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smallerOrEqual('md')
const { height } = useElementSize(document.querySelector('body'))
const stop = mobile.value ? watch(height, () => ScrollTrigger.refresh()) : null

const animateOnScroll = {
  mounted(el) {
    const { startAnimation, stopAnimation } = useAnimations(el)
    gsap.set(el, { opacity: 0 })
    timelines.push(gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top+=${mobile.value ? 150 : 220}px bottom`,
        end: 'bottom top',
        onEnter: () => {
          startAnimation()
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1 })
        },
        onLeaveBack: () => {
          gsap.fromTo(el, { opacity: 1 }, { opacity: 0 })
          stopAnimation()
        },
      },
    }))
  },
  unmounted() {
    timelines.forEach(tl => tl.kill())
    timelines.length = 0
    stop?.()
  },
}

export default animateOnScroll