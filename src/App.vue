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
import { useFetch, useElementSize } from '@vueuse/core'
import { ref, shallowRef, provide, watch } from 'vue'
import { useAuth } from '@/scripts/api'
import { ScrollTrigger } from 'gsap/all'

const isHeroBtnVisible = ref(true)
provide('isHeroBtnVisible', isHeroBtnVisible)

const timelines = shallowRef([])
provide('timelines', timelines)

const { verifySession } = useAuth()
const { data, execute: checkApi } = useFetch(import.meta.env.VITE_API_URL + '/check', {
  immediate: false,
})

checkApi().then(() => {
  console.log(data.value)
  verifySession()
})

const { height } = useElementSize(document.querySelector('body'))
watch(height, () => ScrollTrigger.refresh())
</script>

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>