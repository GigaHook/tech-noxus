<template>
  <div ref="wrapper">
    <slot/>
  </div>
</template>

<script setup>
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { useAnimations } from "@/scripts/animations"
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useStore } from '@/scripts/store'
import { gsap } from 'gsap/all'

const wrapper = ref()
const el = computed(() => wrapper.value?.children?.[0])
const { mobile } = useDisplay()
const store = useStore()

onActivated(() => {
  const { startAnimation } = useAnimations(el.value)
  gsap.set(el.value, { opacity: 0 })
  store.timelines.value.push(gsap.timeline({
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
  store.timelines.value.forEach(tl => tl.kill())
  store.timelines.value.length = 0
})
</script>
