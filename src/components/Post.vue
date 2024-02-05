<template>
  <v-card class="ma-4">
    <v-img 
      :src="post.image"
      width="100%"
      eager
      class="mb-2"
    />

    <v-card-title class="d-inline">
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle class="text-body-2 font-weight-bold d-inline">
      {{ post.date }}
    </v-card-subtitle>

    <v-card-text class="text-body-1">
      {{ post.text }}
    </v-card-text>
  
    <!--TODO: complete crud-->
    <v-card-actions class="mt-n4">
      <v-btn
        text="Подробнее"
      />

      <template v-if="user">
        <v-btn
          @click=""
          text="Изменить"
        />              
  
        <v-btn
          @click=""
          text="Удалить"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const user = useStorage('user', null)
const { post } = defineProps({ post: Object })
</script>