<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="7" xl="5">
        <template v-if="isFetching">
          <v-skeleton-loader
            v-for="post in 4"
            type="image, article, button"
            elevation="6"
            :height="mobile ? '44vh' : '70vh'"
            class="mb-4"
          />
        </template>

        <div v-else-if="error" class="text-center">
          Не удалось загрузить новости
        </div>

        <div v-else-if="posts?.data.length == 0" class="text-center">
          У нас пока нет новостей для вас
        </div>

        <template v-else>
          <Post
            v-for="post, index in posts?.data"
            :key="index"
            :post="post"
          />
        </template>
      </v-col>
      
      <v-col cols="12" v-if="!posts?.data.length == 0 && !error">
        <v-pagination
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
import { ref, watch, onMounted, getCurrentInstance } from 'vue'
import { useFetch } from '@vueuse/core'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import Post from '@/components/Post.vue'

const url = import.meta.env.VITE_API_URL
const { mobile } = useDisplay()
const currentPage = ref(url + '/posts')
const paginatedLink = url + '/posts?page='
const currentPageNumber = ref(1)

const { data: posts, isFetching, error } = useFetch(currentPage, {
  refetch: true,
}).json()

function toPage(page) {
  currentPage.value = page
}
</script>

<style>
.v-skeleton-loader {
  overflow: hidden !important;
}

.v-skeleton-loader__image {
  height: 55% !important;
  margin-top: -12px !important;
}
</style>