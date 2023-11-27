import { gsap } from "gsap/all"
import { onMounted, watch } from "vue"
import { useMouseInElement, useScroll } from '@vueuse/core'

export function slideLeft(text) {
  onMounted(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: 'bottom+=100px bottom',
        end: '+=50px',
        scrub: 2,
      },
    })
    .set(text, {
      opacity: 0,
      x: '-100%',
    })
    .to(text, {
      delay: 1,
      opacity: 1,
      x: '0',
      duration: 1,
    })
  })
}

export function parallax(target, value) {  
  function cap(x, max) {
    if (x > max + x) return max + x
    if (x < -max + x) return -max + x
    return x
  }

  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)

  watch ([elementX, elementY], () => !isScrolling.value && gsap.to(target.value.$el, {
      x: cap((elementX.value - elementWidth.value / 2) / value, 60 - value),
      y: cap((elementY.value - elementHeight.value / 2) / value, 60 - value),
    })
  )
}