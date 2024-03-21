import { gsap } from "gsap/all"
import { toValue, ref, onMounted, watch, onUnmounted, getCurrentInstance } from "vue"
import { useMouseInElement, useScroll, useElementVisibility, useIntersectionObserver } from '@vueuse/core'

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

const observers = []

function useSingletonObserver(elem) {

}

//движение к курсору
//TODO сделать единственный синглтон обсервер для каждого родителя 
//чтобы избежать повторения тк они 100% есть
export function parallax(target, valueX, valueY=valueX) {
  const elem = defineElem(target)
  const { isScrolling } = useScroll(window)
  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)
  
  console.log(getCurrentInstance().parent.ctx.$el)

  if (false) {
    const isVisible = ref(false)
    //useIntersectionObserver(
    //  parent,
    //  ([{ isIntersecting }]) => isVisible.value = isIntersecting
    //)

    watch(isVisible, () => console.log(isVisible.value))
  }
  
  watch([elementX, elementY], () => {
    if (isScrolling.value) return
    gsap.to(elem, {
      x: (elementX.value - elementWidth.value / 2) / valueX,
      y: (elementY.value - elementHeight.value / 2) / valueY,
    })
  })
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
  const animations = Array.from(
    toValue(target)
      .querySelectorAll('*'))
      .flatMap(elem => elem.getAnimations()
  )

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