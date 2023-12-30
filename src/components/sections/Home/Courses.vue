<template>
  <v-container
    id="courses"
    class="my-16"
    :style="{
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
        class="card"
      />
    </v-row>
  </v-container>  
</template>

<script setup>
import CourseCard from '@/components/CourseCard.vue'
import courses from '@/courses'
import { slideLeft } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'

slideLeft('.courses-title')

const display = useDisplay()
</script>

<style>
.card:hover {
  z-index: 1;
}
</style>