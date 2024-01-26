<template>
  <v-container class="mt-16">
    <v-row>
      <v-col
        v-for="post in posts.data"
        cols="1"
      >
        <v-card>
          <v-card-text>
            {{ post }}
            <v-btn
              text="Удалить"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePosts } from '@/composables/api'
import { useFetch, useStorage } from '@vueuse/core'

const { data: posts } = useFetch(import.meta.env.VITE_API_URL + '/posts', {
  afterFetch(ctx) {
    posts.value = JSON.parse(ctx.posts)
  }
})
//TOTO shit
</script>