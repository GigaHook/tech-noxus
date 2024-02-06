<template>
  <div :class="triggerClass">
    <div v-if="visible">
      <slot/>
    </div>

    <div v-else style="opacity: 0;">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap/all'

const visible = ref(false)
const triggerClass = `render-trigger-${gsap.utils.random(-100, 100, 1, false)}`

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.' + triggerClass,
      start: 'top+=200px bottom',
      end: 'bottom top',
      onEnter: () => visible.value = true,
      onLeaveBack: () => visible.value = false,
    }
  })
})
</script>