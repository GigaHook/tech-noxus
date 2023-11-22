<template>
  <v-container class="px-8">
    <v-row justify-md="space-around" justify-lg="center">
      <v-col cols="10" class="text-h4 mb-16 about-title">
        У нас вы научитесь
      </v-col>

      <AboutRow
        v-for="(row, index) in rows"
        :key="index"
        :index="index"
        :title="row.title"
        :text="row.text"
        :img="row.img"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { gsap } from 'gsap/all'
import { onMounted } from 'vue'

const rows = [
  {
    title: 'Основам вёрстки',
    text: 'Освойте вёрстку сайтов и интерфейсов с нуля - от тегов HTML до адаптивной вёрстки и анимаций на CSS. На практических примерах изучите всё - от семантики до современных технологий.',
    img: 'LayoutSvg',
  },
  {
    title: '3D моделированию',
    text: 'Создавайте потрясающие 3D модели с нуля в популярном и мощном Blender. Наши опытные преподаватели обучат вас всем тонкостям 3D моделирования объектов, персонажей и пространств.',
    img: 'ModelingSvg',
  },
  {
    title: 'Технике видеомонтажа',
    text: 'Овладейте искусством видеомонтажа, научитесь монтировать и обрабатывать видео, добавлять спецэффекты, работать с цветокоррекцией и графикой. Сможете монтировать рекламные ролики, клипы, фильмы',
    img: 'VideoSvg',
  },
]

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.about-title',
      start: 'bottom+=100px bottom',
      end: '+=50px',
      scrub: 1,
    },
  })
  .set('.about-title', {
    opacity: 0,
    scale: 0,
  })
  .to('.about-title', {
    delay: 1,
    opacity: 0.8,
    scale: 1.2,
    duration: 0.8,
  })
  .to('.about-title', {
    opacity: 1.0,
    scale: 1.0,
    duration: 0.2,
  })
})
</script>

<style scoped>
.about-title {
  opacity: 0;
}
</style>