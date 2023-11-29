<template>
  <v-app>
    <Header :menu-items="menuItems" :data="dataHeader"/>
    <v-layout>
      <v-main>
        <Hero ref="hero" :data="dataHero"/>
        <About ref="about"/>
        <About2 v-if="!mobile"/>
        <Courses ref="courses"/>
        <Timetable ref="timetable"/>
        <Map ref="map"/>
        <Form ref="form"/>
        <Footer/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import About2 from '@/components/sections/About2'
import Timetable from '@/components/sections/Timetable'
import Courses from '@/components/sections/Courses'
import Map from '@/components/sections/Map'
import Form from '@/components/sections/Form'

import { ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()

const hero = ref()
const about = ref()
const timetable = ref()
const courses = ref()
const map = ref()
const form = ref()

const dataHeader = ref({
  hero: hero,
  form: form,
}) 
const dataHero = ref({
  about: about,
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
    text: 'Расписание',
    ref: timetable,
  },
  {
    text: 'Мы на карте',
    ref: map,
  }

]
</script>

<style>
@font-face {
  font-family: 'BrassMono';
  src: url('@/assets/fonts/BrassMono.ttf');
}
</style>
