import { gsap } from "gsap/all"
import { toValue, onMounted, watch, onUnmounted, getCurrentInstance } from "vue"
import { useMouseInElement, useScroll, useElementVisibility, whenever, watchPausable } from '@vueuse/core'

//вжух слева
export function slideLeft(elem) {
  onMounted(() => {
    useTimeline({
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

//плавное появление
export function fadeIn(elem) {
  onMounted(() => {
    useTimeline({
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

const observedParents = new Map()

export function parallax(
  target,
  valueX,
  valueY=valueX,
  parent=getCurrentInstance().parent.ctx.$el //передавать только в случае использования вне SVG
) {
  const elem = defineElem(target)
  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)

  !observedParents.has(parent) && observedParents.set(parent, useElementVisibility(parent))
  const isVisible = observedParents.get(parent)
  
  const animation = watchPausable([elementX, elementY], () => {
    gsap.to(elem, {
      x: (elementX.value - elementWidth.value / 2) / valueX,
      y: (elementY.value - elementHeight.value / 2) / valueY,
    })
  })

  animation.pause()

  whenever(
    () => !isScrolling.value && isVisible.value,
    (newVal, oldVal, onCleanup) => {
      animation.resume()
      onCleanup(animation.pause)
    }
  )

  onUnmounted(animation.stop)
}

//наклон к курсору
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

//начать/остановить css анимации
export function useAnimations(target) {
  const animations = Array.from(toValue(target).querySelectorAll('*'))
    .flatMap(elem => elem.getAnimations())

  function startAnimation() {
    animations.forEach(animation => animation.play())
  }

  function stopAnimation() {
    animations.forEach(animation => animation.cancel())
  }

  return {
    startAnimation,
    stopAnimation,
  }
}

//выносим мусор
export function useTimeline(...args) {
  const tl = gsap.timeline(...args)
  onUnmounted(() => tl.kill())
  return tl
}