<template>
  <v-container>
    <v-row justify-md="space-around" justify-lg="center">
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

const rows = [
  {
    title: 'В чём суть?',
    text: 'Мы рады представить вам нашу карту лояльности, которая призвана сделать вашу учебу в нашей школе еще более впечатляющей и выгодной. Эта карта дает вам доступ к эксклюзивным скидкам и бонусам у партнерёв по всему городу.',
    img: (await import("@/components/svg/PartnersCardSvg.vue")).default
  },
  {
    title: 'Как получить карту?',
    text: 'Всё очень просто. Каждый ученик нашей школы может бесплатно получить карту. Она выдаётся на первом занятии.',
    img: (await import("@/components/svg/GuideSvg.vue")).default
  },
]
</script>