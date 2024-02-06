<template>
  <Hero/>

  <Suspense>
    <About/>
  </Suspense>

  <Suspense>
    <Courses/>
  </Suspense>

  <Timetable/>
  <Form/>
  <Map/>
  <CardBanner/>
</template>

<script setup>
import Hero from '@/components/sections/Home/Hero'
import About from '@/components/sections/Home/About'
import Timetable from '@/components/sections/Home/Timetable'
import Courses from '@/components/sections/Home/Courses'
import Map from '@/components/sections/Home/Map'
import Form from '@/components/sections/Home/Form'
import CardBanner from '@/components/sections/Home/CardBanner.vue'
</script>