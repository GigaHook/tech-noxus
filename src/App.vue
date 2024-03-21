<template>
  <v-app>
    <Header/>
      <v-main class="main">
        <Suspense>
          <router-view/>
        </Suspense>
      </v-main>
    <Footer/>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useFetch } from '@vueuse/core'
import { useAuth } from '@/scripts/api'

const { verifySession } = useAuth()
const { data, execute: checkApi } = useFetch(import.meta.env.VITE_API_URL + '/check',{
  immediate: false,
})

checkApi().then(() => {
  console.log(data.value)
  verifySession()
})
</script>

<style scoped>
.main {
  min-height: calc(100vh - 152px) !important;
}
</style>

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>