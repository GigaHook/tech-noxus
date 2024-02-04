<template>
  <v-container class="mt-12">
    <v-row justify="center">
      <v-col cols="12" lg="7" xl="5">
        <template v-if="!isFetching">
          <v-card
            v-for="post in posts?.data"
            class="ma-4 pt-2"
          >
            <v-card-title class="d-inline">
              {{ post.title }}
            </v-card-title>

            <v-card-subtitle class="text-body-2 font-weight-bold d-inline">
              {{ post.date }}
            </v-card-subtitle>

            <v-card-text
              class="text-body-1"
            >
              {{ post.text }}
              <v-btn
                variant="plain"
                text="Подробнее"
              />
            </v-card-text>

            <v-img 
              :src="post.image"
              width="100%"
              eager
            />
  
            <!--TODO: complete crud-->
            <v-card-actions v-if="user">
              <v-btn
                @click=""
                text="Изменить"
              />              

              <v-btn
                @click=""
                text="Удалить"
              />
            </v-card-actions>
          </v-card>
        </template>
    
        <template v-else>
          <v-skeleton-loader
            v-for="post in 4"
            type="article, image"
            elevation="4"
            :height="mobile ? '35vh' : '70vh'"
            class="ma-4"
          />
        </template>

        <v-pagination
          v-if="posts?.meta.total > 10"
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
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { usePosts } from '@/composables/api'
import { useFetch, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/useStore'

const { mobile, } = useDisplay()
const store = useStore()
const currentPage = ref(import.meta.env.VITE_API_URL + '/posts')
const paginatedLink = import.meta.env.VITE_API_URL + '/posts?page='
const currentPageNumber = ref(1)
const user = useStorage('user', null)

const { destroy } = usePosts()

const { isFetching, data: posts, execute } = useFetch(currentPage, {
  immediate: false,
  refetch: true,
}).json()

function toPage(page) {
  currentPage.value = page
}

onBeforeMount(async () => {
  if (!store.posts) {
    await execute()
    store.posts = posts
  } else {
    posts.value = store.posts
  }
  console.log(posts.value)
})

onBeforeUnmount(() => {
  store.posts = posts
})
</script>