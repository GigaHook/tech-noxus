<template>
  <v-app>
    <Header/>

    <v-main style="min-height: calc(100vh - 136px) !important;">
      <router-view>
        <template v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component"/>
          </KeepAlive>
        </template>
      </router-view>
    </v-main>
    
    <Footer/>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useFetch, useBreakpoints, useElementSize, breakpointsTailwind } from '@vueuse/core'
import { ref, provide, watch, onMounted, getCurrentInstance } from 'vue'
import { useAuth } from '@/scripts/api'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useAnimations } from "@/scripts/animations"

const isHeroBtnVisible = ref(true)
provide('isHeroBtnVisible', isHeroBtnVisible)

const timelines = []
provide('timelines', timelines)

const breakpoints = useBreakpoints(breakpointsTailwind)
const mobile = breakpoints.smallerOrEqual('md')
const { height } = useElementSize(document.querySelector('body'))
const { verifySession } = useAuth()
const { data, execute: checkApi } = useFetch(import.meta.env.VITE_API_URL + '/check', {
  immediate: false,
})

checkApi().then(() => {
  console.log(data.value)
  verifySession()
})

if (mobile.value) {
  watch(height, () => ScrollTrigger.refresh())
}

onMounted(() => {
  

  //router.beforeEach((to, from, next) => {
  //  console.log(from.matched[0]?.instances.default)
  //  console.log(to.matched[0]?.instances.default)
  //  next()
  //})

  //watch(currentRoute, () => {
  //  console.log(currentRoute)
  //}, { immediate: true, deep: true })
})
</script>

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>