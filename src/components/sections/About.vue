<template>
  <v-container class="px-8">
    <v-row justify-md="space-around" justify-lg="center">
      <v-col
        cols="12"
        class="text-h4"
        :class="mobile ? 'mb-0' : 'mb-16'"
      >
        <Title class="about-title text-no-wrap" ref="title">
          У нас вы научитесь
        </Title>
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
import { ref } from 'vue'
import { slideLeft } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()
const title = ref()

defineExpose({ title })

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
    text: 'Овладейте искусством видеомонтажа, научитесь монтировать и обрабатывать видео, добавлять спецэффекты, работать с цветокоррекцией и графикой. Монтируйте рекламные ролики, клипы, фильмы.',
    img: 'VideoSvg',
  },
  {
    title: 'С нуля до первых проектов',
    text: 'Неважно, есть ли у вас опыт в программировании и дизайне или вы только делаете первые шаги в IT.Мы научим вас всем навыкам, необходимым для работы над реальными проектами.',
    img: 'FirstProjectSvg',
  },
]

slideLeft('.about-title')
</script>

<style scoped>
.about-title {
  opacity: 0;
}
</style>