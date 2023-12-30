<template>
  <v-col
    cols="12" md="6" lg="5" xl="4"
    class="text-h6 mt-2"
    :class="(index == 3 && !mobile) && 'mt-16 pt-16'"
    :order-md="even ? index + 1 : index"
    :order="index + 1"
  >
    <Title v-if="!mobile" :class="`title${index}`">
      {{ title }}
    </Title>

    <div :class="`text text${index}`">
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
  >
    <Title v-if="mobile" :class="`title${index}`">
      {{ title }}
    </Title>
    
    <RenderOnScroll style="height: 40vh;">
      <component
        :is="img"
        :style="index == 3 && !mobile
          ? {'height': '60vh !important'}
          : {'max-height': '50vh'}
        "/>
    </RenderOnScroll>
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
      trigger: `.title${index}`,
      start: 'top+=150px bottom',
      end: '+=150px',
      scrub: 1.5,
    }
  })
  .set(`.title${index}`, {
    opacity: 0,
    x: even ? 300 : -300,
  })
  .set(`.text${index}`, {
    opacity: 0,
    x: even ? 300 : -300,
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