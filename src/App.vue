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
</script>
