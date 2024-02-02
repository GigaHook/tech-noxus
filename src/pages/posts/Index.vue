<template>
  <v-container class="mt-16">
    <v-row justify="center" wrap="nowrap">
      <v-col
        v-for="post in posts?.data"
        cols="12" lg="8" xl="7"
      >
        <v-card
          :title="post.title"
          :text="post.text"
        >
          <v-img 
            :src="post.image"
            eager
          />

          <v-card-actions>
            <v-btn text="Побробнее"/>
            <v-btn text="Удалить"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { usePosts } from '@/composables/api'
import { useFetch, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/useStore'

const { mobile, xlAndUp } = useDisplay()
const store = useStore()

const { data: posts, execute } = useFetch(import.meta.env.VITE_API_URL + '/posts', {
  immediate: false,
}).json()

onBeforeMount(async () => {
  if (!store.posts) {
    await execute()
    store.posts = posts
    console.log('fetch executed')
  }
  posts.value = store.posts
})

onBeforeUnmount(() => {
  store.posts = posts
})
</script>