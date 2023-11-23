<template>
  <v-col
    cols="12" md="6" lg="5" xl="4"
    class="text-h6"
    :order-md="even ? index + 1 : index"
  >
    <h2
      class="text-h4 px-2 pt-1 mb-2 title"
      :class="'title' + index"
    >
      # {{ title }}
    </h2>

    <div :class="`text text${index}`">
      {{ text }}
    </div>
  </v-col>

  <v-col
    cols="12" md="6" lg="5"
    class="mb-6"
    :class="'img' + index"
    :order-md="even ? index : index + 1"
  >
    <div style="height: 50vh;">
      <v-fade-transition>
        <component
          :is="img"
          v-if="imgVisible"
          class="mt-n4 w-100 h-100"
        />
      </v-fade-transition>
    </div>
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

const imgVisible = ref(false)
const even = ref(index % 2 == 0)

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: `.img${index}`,
      start: 'top+=200px bottom',
      end: 'bottom top',
      onEnter: () => imgVisible.value = true,
      onLeaveBack: () => imgVisible.value = false,
    }
  })

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
.title {
  background-color: #FFC400;
  width: fit-content;
  text-shadow: 5px -5px white;
}
</style>