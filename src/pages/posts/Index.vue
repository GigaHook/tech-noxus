<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="7" xl="5">
        <template v-if="isFetching">
          <v-skeleton-loader
            v-for="post in 4"
            type="article, image"
            elevation="4"
            :height="mobile ? '35vh' : '70vh'"
            class="ma-4"
          />
        </template>

        <template v-else-if="error">
          <div class="text-center">
            Не удалось загрузить посты
          </div>
        </template>

        <template v-else-if="posts.data.length == 0">
          <div class="text-center">
            У нас пока нет новостей для вас
          </div>
        </template>

        <template v-else>
          <Post
            v-for="post, index in posts.data"
            :key="index"
            :post="post"
          />
        </template>
        
        <!--<Suspense>
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
        </Suspense>-->
      </v-col>
      
      <v-col cols="12" v-if="!isFetching && !error">
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
import { ref, onBeforeMount } from 'vue'
import { useFetch } from '@vueuse/core'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/store'
import Post from '@/components/Post.vue'

const url = import.meta.env.VITE_API_URL
const { mobile } = useDisplay()
const store = useStore()
const currentPage = ref(url + '/posts')
const paginatedLink = url + '/posts?page='
const currentPageNumber = ref(1)

const { data: posts, execute, isFetching, error } = useFetch(currentPage, {
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
})

</script>