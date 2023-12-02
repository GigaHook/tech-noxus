<template>
  <v-col cols="6" md="4" lg="3">
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 20 : 8"
      class="course-card d-flex flex-column"
      ref="card"
      :style="{
        transform: !mobile && cardTransform,
        transition: 'all .1s ease-out',
      }"
    >
      <v-img 
        class="card-image ma-2"
        src="@/assets/images/courses/minecraft_python.png"
      />

      <v-card-title class="text-h6 text-wrap">
        {{ course.title }}
      </v-card-title>

      <v-card-text class="text-body-1 d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">
          {{ course.price }} 
          <v-icon
            icon="mdi mdi-currency-rub"
            class="mb-1 ms-n2"
            size="22"
          />

        </div>
        <CourseTypeChip :type="course.type"/>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="flat" color="amber-accent-3">
          Записаться
        </v-btn>

        <v-btn variant="plain">
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

const { course } = defineProps({ course: Object })

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
    const MAX_ROTATION = 4
  
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
  height: 400px;
}

.card-image {
  height: calc(50% - 16px);
  width: calc(100% - 16px);
}
</style>
