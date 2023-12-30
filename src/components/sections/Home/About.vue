<template>
  <v-container class="px-8" id="about">
    <v-row justify-md="space-around" justify-lg="center">
      <v-col
        cols="12"
        class="text-h4"
        :class="mobile ? 'mb-0' : 'mb-16'"
      >
        <Title class="about-title text-no-wrap" ref="title">
          Мы научим
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
import AboutRow from '@/components/AboutRow.vue'
import { ref } from 'vue'
import { slideLeft } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { mobile } = useDisplay()
const title = ref()

defineExpose({ title })

const rows = [
  {
    title: 'Основам вёрстки',
    text: 'Ваш ребёнок научится основам вёрстки сайтов и интерфейсов с нуля - от тегов HTML до адаптивной вёрстки и анимаций на CSS, на практических примерах изучит всё - от семантики до современных технологий.',
    img: (await import("@/components/svg/LayoutSvg.vue")).default,
  },
  {
    title: '3D моделированию',
    text: 'Ученик сам сможет создавать потрясающие 3D модели с нуля в популярном и мощном Blender. Наши опытные преподаватели обучат всем тонкостям 3D моделирования объектов, персонажей и пространств.',
    img: (await import("@/components/svg/ModelingSvg.vue")).default,
  },
  {
    title: 'Технике видеомонтажа',
    text: 'Мы научим искусству видеомонтажа, обработке видео, работать с цветокоррекцией, графикой и спецэффектами. Ваш ребёнок будет монтировать рекламные ролики, клипы, фильмы.',
    img: (await import("@/components/svg/VideoSvg.vue")).default,
  },
  {
    title: 'С нуля до первых проектов',
    text: 'Неважно, есть ли у ребёнка опыт в программировании и дизайне или он только делает первые шаги в IT. Мы научим всем навыкам, необходимым для работы над реальными проектами.',
    img: (await import("@/components/svg/FirstProjectSvg.vue")).default,
  },
]

slideLeft('.about-title')
</script>

<style scoped>
.about-title {
  opacity: 0;
}
</style>