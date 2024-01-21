<template>
  <v-app>
    <Header/>
    <v-layout>
      <v-main>
        <router-view/>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import { useFetch } from '@vueuse/core'

//useFetch(import.meta.env.VITE_API_URL + '/check').then(response => console.log(response.data.value))
const { isFetching, data, error, execute } = useFetch(import.meta.env.VITE_API_URL + '/check', {
  immediate: false
})

execute().then(() => {
  console.log(data.value)
})
</script>
