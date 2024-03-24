<template>
  <v-app>
    <Header/>
    <!--жопа-->
    <v-main style="min-height: calc(100vh - 152px) !important;">
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
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home.vue'
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

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>