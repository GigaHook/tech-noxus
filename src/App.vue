<template>
  <v-app>
    <Header :menu-items="menuItems" :data="dataHeader"/>
    <v-layout>
      <v-main>
        <Hero ref="hero" :data="dataHero"/>
        <About ref="about"/>
        <About2 v-if="!mobile"/>
        <Timetable ref="timetable"/>
        <Courses ref="courses"/>
        <Footer/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About.vue'
import About2 from '@/components/sections/About2.vue'
import Timetable from '@/components/sections/Timetable.vue'
import Courses from '@/components/sections/Courses.vue'

import { ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()

const hero = ref()
const about = ref()
const timetable = ref()
const courses = ref()

const dataHeader = ref({ hero: hero }) 
const dataHero = ref({ about: about })

const menuItems = [
  {
    text: 'О нас',
    ref: about,
  },
  {
    text: 'Расписание',
    ref: timetable,
  },
  {
    text: 'Курсы',
    ref: courses,
  },
]
</script>

<style>
@font-face {
  font-family: 'BrassMono';
  src: url('@/assets/fonts/BrassMono.ttf');
}
</style>
