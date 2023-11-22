<template>
  <v-col cols="12" sm="12" md="4">
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 20 : 8"
      class="card"
      ref="card"
      :style="{
        transform: cardTransform,
        transition: 'all .1s ease-out',
      }"
    >
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text class="text-body-1">
        {{ text }}
      </v-card-text>
    </v-card>
  </v-col>  
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core'
import { ref, computed } from 'vue'

defineProps({
  title: String,
  text: String,
})

const hover = ref()
const card = ref()

const {
  elementX,
  elementY,
  isOutside,
  elementHeight,
  elementWidth,
} = useMouseInElement(card)

const cardTransform = computed(() => {
  const MAX_ROTATION = 10

  const rX = (
    MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2)

  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2
  ).toFixed(2)

  return isOutside.value 
    ? '' 
    : `perspective(${elementWidth.value}px) rotateX(${-rX}deg) rotateY(${-rY}deg) scale(1.05)`
})
</script>
