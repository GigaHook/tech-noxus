<template>
  <v-col
    cols="12" md="6" lg="5" xl="4"
    class="text-h6"
    :order-md="even ? index + 1 : index"
  >
    <Title :class="`title${index}`">
      {{ title }}
    </Title>

    <div :class="`text text${index}`">
      {{ text }}
    </div>
  </v-col>

  <v-col
    cols="12" md="6" lg="5" 
    class="mb-6" 
    :order-md="even ? index : index + 1"
  >
    <RenderOnScroll>
      <component :is="img"/>
    </RenderOnScroll>
  </v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap/all'

const { index } = defineProps({
  index: Number,
  title: String,
  text: String,
  img: String,
})

const even = ref(index % 2 == 0)

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: `.text${index}`,
      start: 'top+=100px bottom',
      end: '+=150px',
      scrub: 1.5,
    }
  })
  .set(`.title${index}`, {
    opacity: 0,
    x: even.value ? 300 : -300,
  })
  .set(`.text${index}`, {
    opacity: 0,
    x: even.value ? 300 : -300,
  })
  .to(`.title${index}`, {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.2,
  })
  .to(`.text${index}`, {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.4,
  })
})
</script>

<style scoped>
.text, .title {
  opacity: 0
}
</style>