<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="5" xl="4">
        <RenderOnScroll style="height: 50vh;">
          <PartnersCardSvg />
        </RenderOnScroll>
      </v-col>

      <v-col cols="12" lg="6" xl="5" class="text-h6">
        <h3 class="text-h4 partners-about-title">
          В чём суть?
        </h3>

        Мы рады представить вам нашу карту лояльности, которая призвана сделать вашу учебу в нашей школе еще более впечатляющей и выгодной.
        Эта карта дает вам доступ к эксклюзивным скидкам и бонусам в магазинах-партнерах по всему городу.
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap/all'
import PartnersCardSvg from '@/components/svg/PartnersCardSvg.vue'

onMounted(() => {
  gsap.fromTo('.partners-about-title', {
    x: '100%',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    delay: 2,
  })
})
</script>