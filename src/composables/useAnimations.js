import gsap from "gsap/all"
import { onMounted } from "vue"

function slideLeft(title) {
  onMounted(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: 'bottom+=100px bottom',
        end: '+=50px',
        scrub: 2,
      },
    })
    .set(title, {
      opacity: 0,
      x: '-100%',
    })
    .to(title, {
      delay: 1,
      opacity: 1,
      x: '0',
      duration: 1,
    })
  })
}

export default function useAnimations() {
  return {
    slideLeft,
  }
}