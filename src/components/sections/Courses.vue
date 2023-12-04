<template>
  <v-container class="my-16" :style="{
      'max-width': display.xl.value && '1320px'
    }"
  >
    <Title class="courses-title pb-4">
      Все курсы
    </Title>

    <v-row justify="center" class="course-card-container">
      <CourseCard
        v-for="(course, index) in courses"
        :key="index"
        :course="course"
        :index="index"
        :data="data"
        class="card"
      />
    </v-row>
  </v-container>  
</template>

<script setup>
import { slideLeft } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { gsap } from 'gsap/all'
import { onMounted } from 'vue'
import courses from '@/courses'

defineProps({ data: Object })

slideLeft('.courses-title')

const display = useDisplay()

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.course-card-container',
      start: 'top+=150px bottom',
      end: 'bottom-=100px bottom',
      scrub: 1,
    }
  })
  .fromTo('.course-card', {
    opacity: 0,
  }, {
    opacity: 1,
    stagger: 1,
    duration: 4,
  })
})
</script>

<style>
.card:hover {
  z-index: 1;
}
</style>