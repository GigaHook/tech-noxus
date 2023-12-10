<template>
  <Header :menu-items="menuItems" :data="headerData"/>
  <v-layout>
    <v-main>
      <Hero ref="hero" :data="heroData"/>

      <Suspense>
        <About ref="about"/>
      </Suspense>

      <Suspense>
        <Courses ref="courses" :data="coursesData"/>
      </Suspense>

      <Map ref="map"/>

      <Timetable ref="timetable"/>

      <Form ref="form"/>
      
      <Footer/>
    </v-main>
  </v-layout>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Timetable from '@/components/sections/Timetable'
import Courses from '@/components/sections/Courses'
import Map from '@/components/sections/Map'
import Form from '@/components/sections/Form'

import { ref } from 'vue'

const hero = ref()
const about = ref()
const timetable = ref()
const courses = ref()
const map = ref()
const form = ref()

const headerData = ref({
  hero: hero,
  form: form,
})

const heroData = ref({
  about: about,
  form: form,
})

const coursesData = ref({
  form: form,
})

const menuItems = [
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
</script>