<template>
  <v-app>
    <v-layout>
      <Header/>
      <v-main>
        <Hero/>
        <About/>
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
import About from './components/sections/About.vue'
import Timetable from './components/sections/Timetable.vue'
import Courses from './components/sections/Courses.vue'
</script>

<style>

</style>
