import { useAnimations } from "@/composables/animations"
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { gsap } from 'gsap/all'

const timelines = []

const animateOnScroll = {
  mounted(el) {
    const { startAnimation, stopAnimation } = useAnimations(el)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mobile = breakpoints.smallerOrEqual('md')
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
  },
}

export default animateOnScroll