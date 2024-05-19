<template>
  <v-card
    class="mb-4"
    :elevation="expanded ? 20 : 6"
    :style="expanded && 'z-index: 1'"
  >
    <v-img 
      :src="post.image"
      :aspect-ratio="16 / 9"
      class="mb-2"
      eager
      cover
    />

    <v-card-title>
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle class="text-body-2 font-weight-bold d-inline">
      {{ post.date }}
    </v-card-subtitle>

    <v-card-text class="text-body-1">
      <v-expand-transition mode="in-out">
        <div v-if="expanded">
          {{ post.fulltext }}    
        </div>

        <div v-else>
          {{ post.text }}    
        </div>
      </v-expand-transition>
    </v-card-text>
  
    <v-card-actions class="mt-n4">
      <v-btn
        @click="expanded = !expanded"
        text="Подробнее"
      />

      <template v-if="user">
        <v-btn
          @click="$router.push({
            name: 'PostsUpdate',
            params: { id: post.id },
          })"
          text="Изменить"
        />              
  
        <v-btn
          @click="deletePost(post.id)"
          text="Удалить"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { usePosts } from '@/scripts/api.js'

const expanded = ref(false)
const user = useStorage('user', null)
const { post } = defineProps({ post: Object })
const { deletePost } = usePosts()
</script>