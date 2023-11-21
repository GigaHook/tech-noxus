<template>
  <v-app>
    <v-layout>
      <Header/>
      <v-main>
        <Hero/>
        <Courses/>
        <!--<About/>-->
        <Footer/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Courses from './components/sections/Courses.vue'
import About from './components/sections/About.vue'
</script>

<style>

</style>
