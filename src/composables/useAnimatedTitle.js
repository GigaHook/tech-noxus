import gsap from "gsap/all"
import { onMounted } from "vue"

export default function useAnimatedTitle(title) {
    return onMounted(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: title,
            start: 'bottom+=100px bottom',
            end: '+=50px',
            scrub: 1,
          },
        })
        .set(title, {
          opacity: 0,
          scale: 0,
        })
        .to(title, {
          delay: 1,
          opacity: 0.8,
          scale: 1.2,
          duration: 0.8,
        })
        .to(title, {
          opacity: 1.0,
          scale: 1.0,
          duration: 0.2,
        })
    })
}