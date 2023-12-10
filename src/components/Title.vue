<template>
  <h2 class="my-2 title" :class="mobile ? 'text-h5' : 'text-h4'">
    <slot/>
  </h2>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
const { mobile } = useDisplay()
</script>

<style scoped>

.title {
  opacity: 0;
  width: fit-content;
}
</style>