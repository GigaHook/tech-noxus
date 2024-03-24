<template>
  <div>
    <iframe
      class="w-100"
      style="height: 400px;"
      src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=127607219934"
      frameborder="0"
    ></iframe>
  
    <div>
      {{ count }}
      <v-btn text="+" @click="inc(1)"/>
      <v-btn text="-" @click="dec(1)"/>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated } from 'vue'
import { useCounter } from '@vueuse/core'

const { count, inc, dec } = useCounter()

onActivated(() => console.log('activated'))
onDeactivated(() => console.log('deactivated'))
</script>