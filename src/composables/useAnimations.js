import { gsap } from "gsap/all"
import { onMounted, watch } from "vue"
import { useMouseInElement, useScroll } from '@vueuse/core'

export function slideLeft(elem) {
  onMounted(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: elem,
        start: 'bottom+=100px bottom',
        end: '+=50px',
        scrub: 2,
      },
    })
    .set(elem, {
      opacity: 0,
      x: '-100%',
    })
    .to(elem, {
      delay: 1,
      opacity: 1,
      x: '0',
      duration: 1,
    })
  })
}

export function fadeIn(elem) {
  onMounted(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: elem,
        start: 'bottom+=100px bottom',
        end: '+=50px',
        scrub: 2,
      },
    })
    .set(elem, {
      opacity: 0,
    })
    .to(elem, {
      opacity: 1,
      duration: 1,
    })
  })
}

export function parallax(target, valueX, valueY=valueX) {  
  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)
  const elem = target.value instanceof SVGGElement ? target.value : target.value.$el

  watch ([elementX, elementY], () => !isScrolling.value && gsap.to(elem, {
      x: (elementX.value - elementWidth.value / 2) / valueX,
      y: (elementY.value - elementHeight.value / 2) / valueY
    })
  )
}