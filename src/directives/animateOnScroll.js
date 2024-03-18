import { useAnimations } from "@/composables/animations"
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { gsap } from 'gsap/all'

export const animateOnScroll = el => {
  const { startAnimation, stopAnimation } = useAnimations(el)
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.smallerOrEqual('md')
  gsap.set(el, { opacity: 0 })
  gsap.timeline({
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
      }
    }
  })
}