<template>
  <v-container class="px-8 mt-16">
    <v-row>
      <v-col cols="12">
        <Title class="courses-title">
          Все курсы
        </Title>
      </v-col>

      <CourseCard
        v-for="(courses, index) in cards"
        :key="index"
        :title="card.title"
        :text="card.text"
        class="card"
      />
    </v-row>
  </v-container>  
</template>

<script setup>
import { slideLeft } from '@/composables/useAnimations'
import { gsap } from 'gsap'
import { onMounted } from 'vue'
import courses from '@/courses'

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