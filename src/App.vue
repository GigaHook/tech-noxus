<template>
  <v-app>
    <Header/>
      <v-main>
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
import { useAuth } from './composables/api'

const { verifySession } = useAuth()
const { data, execute } = useFetch(import.meta.env.VITE_API_URL + '/check',{
  immediate: false,
})

execute().then(() => {
  console.log(data.value)
  verifySession()
})
</script>