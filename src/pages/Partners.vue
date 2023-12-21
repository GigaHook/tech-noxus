<template>
  <v-layout>
    <v-main>
      <Hero ref="hero"/>
      <Suspense>
        <About ref="about"/>
      </Suspense>
      <Footer />
    </v-main>
  </v-layout>
</template>

<script setup>
import Hero from '@/components/sections/Partners/Hero'
import About from '@/components/sections/Partners/About.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import useStore from '@/composables/useStore'

const store = useStore()
const hero = ref()
const about = ref()
const guide = ref()

onMounted(() => {
  //пока что без меню здесь
  /*store.partnersSections = {
    hero: hero,
    пuide: guide,
  }

  store.partnersMenuItems = [
    {
      text: 'О карте',
      ref: about//about,
    },
    {
      text: 'Как получить карту',
      ref: guide,
    },
  ]*/ 
})
</script>