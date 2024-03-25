<template>
  <div>
    <iframe
      class="w-100"
      style="height: 400px;"
      frameborder="0"
    ></iframe>
  
    <div>
      {{ count }}
      <v-btn text="+" @click="inc(1)"/>
      <v-btn text="-" @click="dec(1)"/>
    </div>
  </div>
</template>

<script setup>
import { useCounter } from '@vueuse/core'
const { count, inc, dec } = useCounter()
</script>