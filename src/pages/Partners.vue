<template>
  <Hero ref="hero"/>
  <Suspense>
    <About ref="about"/>
  </Suspense>
</template>

<script setup>
import Hero from '@/components/sections/Partners/Hero.vue'
import About from '@/components/sections/Partners/About.vue'
</script>