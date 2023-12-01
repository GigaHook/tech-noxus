<template>
  <v-col cols="12" sm="12" md="4">
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 20 : 8"
      class="course-card"
      ref="card"
      :style="{
        transform: !mobile && cardTransform,
        transition: 'all .1s ease-out',
      }"
    >
      <v-card-item>
        <v-img
          class="h-100"
          
        />
      </v-card-item>

      <v-card-title class="text-h5">
        {{ title }} <br>
        <CourseTypeChip :type="course.type"/>
      </v-card-title>

      <v-card-text class="text-body-1 text-truncate">
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-btn 
          variant="plain"
        >
          Подробнее
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>  
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

defineProps({ title: String, text: String })

const { mobile } = useDisplay()

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
  if (!mobile.value) {
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
  }

  return ''
})
</script>

<style scoped>
.course-card {
  height: 350px;
}


</style>
