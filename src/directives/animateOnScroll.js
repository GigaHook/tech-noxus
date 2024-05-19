import { useAnimations } from "@/scripts/animations"
import { breakpointsTailwind, useBreakpoints, until } from '@vueuse/core'
import { gsap } from 'gsap/all'

//запускаем ксс анимации при появлении компонента в поле зрения
//в основном используется для svg компонентов

const timelines = []
const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smallerOrEqual('md')

const animateOnScroll = {
  async mounted(el, binding, vnode) {

    //TODO РЕШЕНИЕ: заменить маунтед и анмаунтед на активейтед и деактивейтед

    const { startAnimation, stopAnimation } = useAnimations(el)

    //const button = document.createElement('button', 'asdzxc')
    //button.innerHTML = 'asdzxc'
    //button.addEventListener('click', () => {
    //  stopAnimation()
    //})
    //el.parentNode.insertBefore(button, el)

    /*vnode.ctx.proxy.$router.beforeEach((to, from, next) => {
      timelines.forEach(tl => {
        tl.kill()
      })
      timelines.length = 0
      next()
    })*/

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
          //stopAnimation()
        },
      },
    }))
  },
  unmounted() {
    timelines.forEach(tl => {
      tl.kill()
    })
    timelines.length = 0
  },
}

export default animateOnScroll