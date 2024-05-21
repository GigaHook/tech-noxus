<template>
  <v-card
    class="mb-4"
    :elevation="expanded ? 20 : 6"
    :style="expanded && 'z-index: 1'"
  >
    <v-img 
      :src="post.image"
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
      <div class="text-container" ref="textContainer">
        {{ text }}
      </div>
    </v-card-text>
  
    <v-card-actions class="mt-n4">
      <v-btn
        @click="expanded ? truncate() : expand()"
        text="Подробнее"
        style="z-index: 2 !important; background-color: white !important;"
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
import { ref, onMounted, nextTick, watch } from 'vue'
import { usePosts } from '@/scripts/api.js'
import { gsap } from 'gsap/all'

const expanded = ref(false)
const user = useStorage('user', null)
const { post } = defineProps({ post: Object })
const { deletePost } = usePosts()
const text = ref(post.text)
const textContainer = ref()
const range = document.createRange()

onMounted(() => {
  gsap.set(textContainer.value, {
    height: '2.4em',
  })
})

function expand() {
  expanded.value = !expanded.value
  text.value = post.fulltext
  nextTick(() => {
    range.selectNode(textContainer.value.firstChild)
    gsap.fromTo(textContainer.value, {
      height: '2.4em',
    }, {
      height: range.getBoundingClientRect().height + 'px',
    })
  })
}

function truncate() {
  expanded.value = !expanded.value
  text.value = post.text
  gsap.fromTo(textContainer.value, {
    height: textContainer.value.clientHeight,
  }, {
    height: '2.4em',
  })
}
</script>