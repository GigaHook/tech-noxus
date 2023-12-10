<template>
  <v-app-bar>
    <v-app-bar-title @click="router.push('/')" style="cursor: pointer">
      <div class="d-flex flex-no-wrap align-center">
        <v-img
          src="@/assets/images/logo.png"
          max-width="60"
        />
        <div class="ms-2">TechNoxus</div>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>