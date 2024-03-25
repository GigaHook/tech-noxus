<template>
  <v-app>
    <Header/>
    <v-app-bar>
      {{ isFetching }}
    </v-app-bar>

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
import { useFetch } from '@vueuse/core'
import { useAuth } from '@/scripts/api'
import useStore from '@/scripts/store'

const store = useStore()
const { verifySession } = useAuth()
const { data, execute: checkApi } = useFetch(import.meta.env.VITE_API_URL + '/check', {
  immediate: false,
})

checkApi().then(() => {
  console.log(data.value)
  verifySession()
})

const { data: mapData, execute: fetchMapData, isFetching } = useFetch('https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=127607219934', {
  
})

fetchMapData().then(() => {
  console.log(mapData.value)
})
</script>

<style>
.limit-length {
  max-width: 100vw !important;
  overflow: hidden !important;
}
</style>