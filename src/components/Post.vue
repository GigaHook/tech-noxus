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

    <v-card-text class="text-body-1 overflow-y-hidden">
      <div class="text-container" ref="textContainer">
        {{ text }}
      </div>
    </v-card-text>
  
    <v-card-actions class="mt-n4" v-if="expandable || $user.value">
      <v-btn
        v-if="expandable"
        @click="expanded ? truncate() : expand()"  
        :text="expanded ? 'Скрыть' : 'Подробнее'"
      />

      <template v-if="$user.value">
        <v-btn
          @click="$store.postBeingEdited.value = post; $router.push({
            name: 'PostsUpdate',
            params: { id: post.id },
          })"
          text="Изменить"
        />
  
        <v-btn
          @click="deletePost(post.id).then(() => $emit('deleted'))"    
          text="Удалить"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted, nextTick, shallowRef } from 'vue'
import { usePosts } from '@/scripts/api.js'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { gsap } from 'gsap/all'

const { post } = defineProps({ post: Object })
const { deletePost } = usePosts()
const text = shallowRef()
const { mobile } = useDisplay()
const expanded = shallowRef(false)
const expandable = shallowRef(true)
const textContainer = ref()
const range = document.createRange()

onMounted(() => {
  text.value = mobile.value ? post.text.slice(0, 70) + '...' : post.text
  expandable.value = mobile.value || post.text.endsWith('...')
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
  text.value = mobile.value ? post.text.slice(0, 70) + '...' : post.text
  gsap.fromTo(textContainer.value, {
    height: textContainer.value.clientHeight + 'px',
  }, {
    height: '2.4em',
  })
}
</script>