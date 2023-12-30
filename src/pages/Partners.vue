<template>
  <v-layout style="min-height: 100vh !important;">
    <v-main>
      <Hero ref="hero"/>

      <Suspense>
        <About ref="about"/>
      </Suspense>

      <Footer/>
    </v-main>
  </v-layout>
</template>

<script setup>
import Hero from '@/components/sections/Partners/Hero'
import About from '@/components/sections/Partners/About.vue'
import Footer from '@/components/Footer.vue'
</script>