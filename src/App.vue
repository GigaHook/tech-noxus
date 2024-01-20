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

useFetch('http://127.0.0.1:8000/check')
  .then(response => console.log(response.data.value))
</script>
