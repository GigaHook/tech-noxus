<template>
  <v-container class="mb-12">
    <v-row justify="center" align="center">
      <v-col cols="12" lg="8" xl="6" class="pe-8">
        <h2 class="text-h4 mb-6 map-title">
          Мы на карте
        </h2>
        <v-card elevation="12" class="map-container">
          <iframe
            class="map w-100"
            src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=127607219934"
            frameborder="0"
          ></iframe>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <RenderOnScroll style="height: 40vh; max-height: 600px;">
          <MapSvg style="max-height: 100%;"/>
        </RenderOnScroll>

        <div class="description mb-2">
          <v-icon icon="fas fa-location-dot" size="24" class="mb-1"/>
          Школа английского языка Express English, г. Смоленск,
          ул. Попова 125
        </div>

        <div class="description mb-2">
          <v-icon icon="fas fa-phone" size="22" class="mb-1"/>
          +7 (906) 517-74-36 <br>
        </div>

        <a 
          href="https://vk.com/technoxus_smol"
          target="_blank"
          rel="noopener noreferrer"
          class="text-black description"
          style="text-decoration: none; cursor: pointer;"
        >
          <v-icon icon="fab fa-vk" size="28" class="mb-1"/>
          ВКонтакте
          <v-icon icon="fas fa-arrow-up-right-from-square" size="16" class="mb-1"/>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { slideLeft } from '@/composables/useAnimations'
import { gsap } from 'gsap/all'
import { onMounted } from 'vue'

slideLeft('.map-title')

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top center',
      end: '+=50px',
      scrub: 1,
    }
  }).fromTo('.map-container', {
    x: '-200%',
  }, {
    x: '0',
  })
})
</script>

<style scoped>
.map {
  height: 400px;
}

.map-title {
  opacity: 0;
}

.description {
  font-size: 18px !important;
}
</style>