<template>
  <v-app>
    <Header/>
    <v-layout>
      <v-main>
        <Suspense>
          <router-view/>
        </Suspense>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header'
import { useFetch, useStorage } from '@vueuse/core'
import useStore from './composables/useStore'

const store = useStore()

store.user = useStorage('user', null)

const { data, execute } = useFetch(import.meta.env.VITE_API_URL + '/check',{
  immediate: false,
})

execute().then(() => {
  console.log(data.value)
})
</script>