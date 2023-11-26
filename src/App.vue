<template>
  <v-app>
    <v-layout>
      <Header/>
      <v-main>
        <Hero/>
        <About/>
        <About2/>
        <Timetable/>
        <Courses/>
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
</script>

<style>
@font-face {
  font-family: 'BrassMono';
  src: url('@/assets/fonts/BrassMono.ttf');
}
</style>
