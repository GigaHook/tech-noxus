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
import { watch, onMounted } from 'vue'
import { useAuth } from '@/scripts/api'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { verifySession } = useAuth()
const { data, execute: checkApi } = useFetch(import.meta.env.VITE_API_URL + '/check', {
  immediate: false,
})

onMounted(async () => {
  const { height } = useElementSize(document.querySelector('body'))
  watch(height, () => ScrollTrigger.refresh())
  await checkApi()
  console.log(data.value)
  await verifySession()
})
</script>

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>