import { gsap } from "gsap/all"
import { ref, onMounted, watch } from "vue"
import { useMouseInElement, useScroll, useIntersectionObserver } from '@vueuse/core'

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
        scrub: true,
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

function defineElem(target) {
  return target.value instanceof SVGGElement ? target.value : target.value.$el
}

//function observe(target) {
//  const isVisible = ref(false)
//  useIntersectionObserver(
//    target, ([{ isIntersecting }]) => isVisible.value = isIntersecting
//  )
//
//  console.log(isVisible.value);
//
//  return isVisible
//}

export function parallax(target, valueX, valueY=valueX) {  
  //const isVisible = observe(target) //TODO fix shit
  const elem = defineElem(target)
  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)

  watch ([elementX, elementY], () => {
      (!isScrolling.value /*&& isVisible.value*/) && gsap.to(elem, {
        x: (elementX.value - elementWidth.value / 2) / valueX,
        y: (elementY.value - elementHeight.value / 2) / valueY
      })
    }
  )
}

export function parallaxAngle(target, max=2, stopOutside=true) {
  const {
    elementX,
    elementY,
    isOutside,
    elementHeight,
    elementWidth,
  } = useMouseInElement(target)

  const elem = defineElem(target)

  watch ([elementX, elementY], () => {
    const rX = (
      max / 2 - (elementY.value / elementHeight.value) * max
    ).toFixed(2)
  
    const rY = (
      (elementX.value / elementWidth.value) * max - max / 2
    ).toFixed(2)
    
    if (isOutside.value && stopOutside) {
      elem.style.transform = ''
    } else {
      elem.style.transform = `perspective(${elementWidth.value}px) rotateX(${-rX}deg) rotateY(${-rY}deg)`
    }
  })
}