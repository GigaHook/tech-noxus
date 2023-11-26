<template>
  <div :class="triggerClass">
    <v-fade-transition>
      <slot v-if="visible"/>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap/all'

const visible = ref(false)
const triggerClass = `render-trigger${Math.round(Math.random().toFixed(2) * 100)}`

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