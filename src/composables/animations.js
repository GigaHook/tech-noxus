import { gsap } from "gsap/all"
import { toValue, computed, onMounted, watch } from "vue"
import { useMouseInElement, useScroll, useElementVisibility } from '@vueuse/core'

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
    .fromTo(elem, {
      opacity: 0,
      x: '-100%',
    }, {
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
    .fromTo(elem, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
    })
  })
}

function defineElem(target) {
  return target.value instanceof SVGGElement ? target.value : target.value.$el
}

export function parallax(target, valueX, valueY=valueX) {  
  //const isVisible = observe(target) //TODO fix shit
  const elem = defineElem(target)
  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)

  watch([elementX, elementY], () => {
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

  watch([elementX, elementY], () => {
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

//start and stop css animations

export function useAnimations(target) {
  const animations = computed(() => {
    return Array.from(toValue(target).querySelectorAll('*')).flatMap(elem => elem.getAnimations())
  })

  function startAnimation() {
    animations.value.forEach(animation => animation.play())
  }

  function stopAnimation() {
    animations.value.forEach(animation => animation.cancel())
  }

  return {
    startAnimation,
    stopAnimation,
  }
}