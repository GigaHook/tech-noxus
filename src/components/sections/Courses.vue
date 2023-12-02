<template>
  <v-container class="mt-16 mb-n4">
    <Title class="courses-title">
      Все курсы
    </Title>
  </v-container>

  <v-container class="mb-16" :style="{
      'max-width': display.xl.value && '1320px'
    }"
  >
    <v-row justify="center">
      <CourseCard
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        class="card"
      />
    </v-row>
  </v-container>  
</template>

<script setup>
import { slideLeft } from '@/composables/useAnimations'
import { gsap } from 'gsap'
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import courses from '@/courses'

const display = useDisplay()

slideLeft('.courses-title')

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.card',
      start: 'top bottom',
      end: '+=100',
      scrub: 2,
    }
  })
  .set('.card', {
    opacity: 0,
    x: -50,
  })
  .to('.card', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
  })
})
</script>

<style>
.card:hover {
  z-index: 1;
}
</style>