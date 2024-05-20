<template>
  <div ref="wrapper">
    <slot/>
  </div>
</template>

<script setup>
import { ref, computed, onActivated, onDeactivated, inject } from 'vue'
import { useAnimations } from "@/scripts/animations"
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { gsap } from 'gsap/all'

const wrapper = ref()
const el = computed(() => wrapper.value?.children?.[0])
const timelines = inject('timelines')
const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smallerOrEqual('md')

onActivated(() => {
  const { startAnimation } = useAnimations(el.value)
  gsap.set(el.value, { opacity: 0 })
  timelines.value.push(gsap.timeline({
    scrollTrigger: {
      trigger: el.value,
      start: `top+=${mobile.value ? 150 : 220}px bottom`,
      end: 'bottom top',
      onEnter: () => {
        startAnimation()
        gsap.fromTo(el.value, { opacity: 0 }, { opacity: 1 })
      },
      onLeaveBack: () => {
        gsap.fromTo(el.value, { opacity: 1 }, { opacity: 0 })
      },
    },
  }))
})

onDeactivated(() => {
  timelines.value.forEach(tl => tl.kill())
  timelines.value.length = 0
})
</script>
