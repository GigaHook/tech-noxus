<template>
  <Hero ref="hero"/>
  <Suspense>
    <About ref="about"/>
  </Suspense>
  <Suspense>
    <Courses ref="courses"/>
  </Suspense>
  <Map ref="map"/>
  <Timetable ref="timetable"/>
  <Form ref="form"/>
  <Footer/>
</template>

<script setup>
//вместо перепрокидывания рефов между компонентами секций
//сунуть каждый реф секции в хранилище
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Home/Hero'
import About from '@/components/sections/Home/About'
import Timetable from '@/components/sections/Home/Timetable'
import Courses from '@/components/sections/Home/Courses'
import Map from '@/components/sections/Home/Map'
import Form from '@/components/sections/Home/Form'

import { ref, toRef, onMounted } from 'vue'
import useStore from '@/composables/useStore'

const store = useStore()
const hero = ref()
const about = ref()
const timetable = ref()
const courses = ref()
const map = ref()
const form = ref()

onMounted(() => {
  store.homeSections = {
    hero: hero,
    about: about,
    timetable: timetable,
    courses: courses,
    map: map,
    form: form,
  }

  store.homeMenuItems = [
    {
      text: 'О нас',
      ref: about,
    },
    {
      text: 'Курсы',
      ref: courses,
    },
    {
      text: 'Где нас найти',
      ref: map,
    },
    {
      text: 'Расписание',
      ref: timetable,
    },
  ]
})

/*
const coursesData = ref({
  form: form,
})
*/
</script>