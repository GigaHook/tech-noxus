<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col
        v-for="post in posts?.data"
        cols="12" lg="6"
      >
        <v-card
          :title="post.title"
          :text="post.text"
        >
          <v-img 
            :src="post.image"
          />
          <v-card-actions>
            <v-btn
              text="Побробнее"
            />
            <v-btn
              text="Удалить"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePosts } from '@/composables/api'
import { useFetch, useStorage } from '@vueuse/core'

const { data: posts } = useFetch(import.meta.env.VITE_API_URL + '/posts').json()
</script>