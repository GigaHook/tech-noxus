<template>
  <v-container
    id="courses"
    class="mt-12"
    :style="display.xl.value && 'max-width: 1320px'"
  >
    <div class="courses-title pb-4 text-h4">
      Наши курсы
    </div>
  
    <v-row justify="center">
      <v-slide-y-transition group>
        <CourseCard
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
          :index="index"
          class="card"
        />
      </v-slide-y-transition>

      <v-col
        v-if="display.mobile.value"
        cols="12"
        class="text-center"
      >
        <v-btn
          @click="isCollapsed = !isCollapsed"
          variant="text"
          stacked
          :append-icon="isCollapsed ? 'mdi mdi-arrow-down' : 'mdi mdi-arrow-up'"
          v-ripple="{ class: `text-yellow` }"
        >
          {{ isCollapsed ? 'Показать всё' : 'Спрятать' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CourseCard from '@/components/CourseCard.vue'
import rawCourses from '@/courses'
import { slideLeft } from '@/scripts/animations'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref, watch } from 'vue'

slideLeft('.courses-title')

const display = useDisplay()
const courses = ref(rawCourses)
const isCollapsed = ref(true)

function collapseCourses() {
  courses.value = rawCourses.slice(0, 4)
}

function expandCourses() {
  courses.value = rawCourses
}

display.mobile.value && watch(isCollapsed, collapsed => {
  collapsed ? collapseCourses() : expandCourses()
}, { immediate: true })
</script>

<style scoped>
.card:hover {
  z-index: 1;
}
</style>