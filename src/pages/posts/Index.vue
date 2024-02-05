<template>
  <v-container class="mt-12">
    <v-row justify="center">
      <v-col cols="12" lg="7" xl="5">
        <Suspense>
          <Post
            v-for="post, index in posts.data"
            :key="index"
            :post="post"
          />

          <template #fallback>
            <v-skeleton-loader
              v-for="post in 4"
              type="article, image"
              elevation="4"
              :height="mobile ? '35vh' : '70vh'"
              class="ma-4"
            />
          </template>
        </Suspense>
      </v-col>
      
      <v-col cols="12">
        <v-pagination
          v-if="posts.meta.total > 10"
          v-model="currentPageNumber"
          :length="posts?.meta.last_page"
          @next="toPage(posts?.links.next)"
          @prev="toPage(posts?.links.prev)"
          @update:model-value="page => toPage(paginatedLink + page)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useFetch } from '@vueuse/core'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/useStore'

const { mobile } = useDisplay()
const store = useStore()
const currentPage = ref(import.meta.env.VITE_API_URL + '/posts')
const paginatedLink = import.meta.env.VITE_API_URL + '/posts?page='
const currentPageNumber = ref(1)

const Post = defineAsyncComponent(() => import('@/components/Post.vue'))

const { data: posts, execute } = useFetch(currentPage, {
  immediate: false,
  refetch: true,
}).json()

function toPage(page) {
  currentPage.value = page
}

if (!store.posts) {
  await execute()
  store.posts = posts
} else {
  posts.value = store.posts
}
</script>