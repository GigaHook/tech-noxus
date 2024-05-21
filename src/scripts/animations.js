import { gsap } from "gsap/all"
import { toValue, onMounted, watch, onUnmounted, getCurrentInstance, onDeactivated, onActivated } from "vue"
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

const defineElem = ({ value }) => value instanceof SVGGElement ? value : value.$el

const observedParents = new Map()

//триггер при входе/выходе из области видимости и начала/прокрутки (только для ниже)
function wheneverVisible(watchPausableInstance, parent) {
  const { isScrolling } = useScroll(window)                 //проверяем не скролим ли мы страницу
  observedParents.set(parent, useElementVisibility(parent)) //надо чтобы не полдить обсерверы
  const isVisible = observedParents.get(parent)             //проверяем находится ли родитель в области видимости
  watchPausableInstance.pause()                             //сразу паузим, тк не факт что элемент изначально в зоне видимости
  whenever(                                                 //запускаем когда страница не скролится и элемент в зоне видимости, иначе не анимируем
    () => !isScrolling.value && isVisible?.value,
    (newVal, oldVal, onCleanup) => {
      watchPausableInstance.resume()
      onCleanup(watchPausableInstance.pause)                //при чистке останавливаем (в основном при переходе между страницами)
    }
  )
}
//движение к курсору
export function parallax(
  target,
  valueX=10,
  valueY=valueX
) {
  const elem = defineElem(target) //получаем чистый элемент
  const { 
    elementX,
    elementY,
    elementWidth,
    elementHeight
  } = useMouseInElement(target) //мышь внутри элемента stuff
  const animation = watchPausable([elementX, elementY], () => { //наблюдаем за координатами мыши, двигаем элемент вместе с мышью
    gsap.to(elem, {
      x: (elementX.value - elementWidth.value / 2) / valueX,
      y: (elementY.value - elementHeight.value / 2) / valueY,
    })
  })

  wheneverVisible(animation, elem.ownerSVGElement || target.value.$parent)
}

//наклон к курсору (не оптимизировал ещё)
export function parallaxAngle(
  target,
  max=2,
  stopOutside=true,
) {
  const elem = defineElem(target)
  const {
    elementX,
    elementY,
    isOutside,
    elementHeight,
    elementWidth,
  } = useMouseInElement(target)

  const animation = watchPausable([elementX, elementY], () => {
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

  animation.pause()

  wheneverVisible(animation, elem.ownerSVGElement || target.value.$parent)
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
  onDeactivated(() => tl.kill())
  return tl
}