<template>
  <v-col
    cols="12" md="6" lg="5" xl="4"
    class="text-h6 mt-2"
    :class="(index == 3 && !mobile) && 'mt-16 pt-16'"
    :order-md="even ? index + 1 : index"
    :order="index + 1"
    style="max-width: 100vw !important; overflow: hidden !important;"
  >
    <div v-if="!mobile" class="text-h4" :class="`title-${index}`">
      {{ title }}
    </div>

    <div :class="`text-${index}`">
      <slot>{{ text }}</slot>
    </div>
  </v-col>

  <v-col
    cols="12" md="6" lg="4" 
    class="mb-8"
    :class="(index == 3 && !mobile) && 'mb-16'"
    :offset-xl="even ? 1 : 0"
    :order-md="even ? index : index + 1"
    :order="index"
    style="max-width: 100vw !important; overflow: hidden !important;"
  >
    <div v-if="mobile" class="text-h5" :class="`title-${index}`">
      {{ title }}
    </div>
    
    <component
      :is="img"
      :style="(index == 3 && !mobile) && {'height': '60vh !important'}"
      v-animate-on-scroll
      v-once
    />
  </v-col>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap/all'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()

const { index } = defineProps({
  index: {
    type: Number,
    required: false,
    default: 0,
  },
  title: String,
  text: String,
  img: Object,
})

const even = index % 2 == 0

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: `.title-${index}`,
      start: 'top+=150px bottom',
      end: '+=150px',
      scrub: 2,
    }
  })
  .fromTo(`.title-${index}`, {
    opacity: 0,
    x: even ? 300 : -300,
  }, {
    opacity: 1,
    x: 0,
    duration: 1,
  })
  .fromTo(`.text-${index}`, {
    opacity: 0,
    x: even ? 300 : -300,
  }, {
    opacity: 1,
    x: 0,
    delay: 1,
    duration: 2,
  })
})
</script>

<style scoped>
.text {
  opacity: 0
}
</style>