<template>
  <v-container class="px-8" id="about">
    <v-row justify-md="space-around" justify-lg="center">
      <v-col
        cols="12"
        class="text-h4"
        :class="mobile ? 'mb-0' : 'mb-16'"
      >
        <div class="about-title text-no-wrap text-h4">
          Мы научим
        </div>
      </v-col>

      <AboutRow
        v-for="(row, index) in rows"
        :key="index"
        :index="index"
        :title="row.title"
        :text="row.text"
        :img="row.img"
        v-once
      />
    </v-row>
  </v-container>
</template>

<script setup>
import AboutRow from '@/components/AboutRow.vue'
import LayoutSvg from "@/components/svg/LayoutSvg.vue"
import ModelingSvg from "@/components/svg/ModelingSvg.vue"
import VideoSvg from "@/components/svg/VideoSvg.vue"
import FirstProjectSvg from "@/components/svg/FirstProjectSvg.vue"
import { slideLeft } from '@/scripts/animations'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()

const rows = [
  {
    title: 'Основам вёрстки',
    text: 'Ваш ребёнок научится основам вёрстки сайтов и интерфейсов с нуля - от тегов HTML до адаптивной вёрстки и анимаций на CSS, на практических примерах изучит всё - от семантики до современных технологий.',
    img: LayoutSvg,
  },
  {
    title: '3D моделированию',
    text: 'Ученик сам сможет создавать потрясающие 3D модели с нуля в популярном и мощном Blender. Наши опытные преподаватели обучат всем тонкостям 3D моделирования объектов, персонажей и пространств.',
    img: ModelingSvg,
  },
  {
    title: 'Технике видеомонтажа',
    text: 'Мы научим искусству видеомонтажа, обработке видео, работать с цветокоррекцией, графикой и спецэффектами. Ваш ребёнок будет монтировать рекламные ролики, клипы, фильмы.',
    img: VideoSvg,
  },
  {
    title: 'С нуля до первых проектов',
    text: 'Неважно, есть ли у ребёнка опыт в программировании и дизайне или он только делает первые шаги в IT. Мы научим всем навыкам, необходимым для работы над реальными проектами.',
    img: FirstProjectSvg,
  },
]


slideLeft('.about-title')
</script>