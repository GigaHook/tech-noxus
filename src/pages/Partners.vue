<template>
  <v-layout>
    <v-main>
      <Hero ref="hero"/>
      <About ref="about"/>
      <Bonuses ref="bonuses"/>
    </v-main>
  </v-layout>
</template>

<script setup>
import Hero from '@/components/sections/Partners/Hero'
import Bonuses from '@/components/sections/Partners/Bonuses'
import About from '@/components/sections/Partners/About.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import useStore from '@/composables/useStore'

const router = useRouter()
const store = useStore()
const hero = ref()
const about = ref()
const bonuses = ref()

onMounted(() => {
  store.partnersSections = {
    hero: hero,
    bonuses: bonuses,
  }

  store.partnersMenuItems = [
    {
      text: 'О карте',
      ref: about//about,
    },
    {
      text: 'Бонусы',
      ref: bonuses,
    },
    {
      text: 'Заказать',
      ref: ''//form,
    },
  ]
})
</script>