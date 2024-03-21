<template>
  <v-container class="my-16" id="map">
    <v-row justify="center" align="center">
      <v-col cols="12" lg="8" xl="6" :class="!display.mobile.value && 'pe-8'">
        <h2 class="text-h4 mb-6 map-title">
          Мы на карте
        </h2>

        <v-card elevation="12" class="map-container">
          <KeepAlive>
            <iframe
              class="map w-100"
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=127607219934"
              frameborder="0"
            ></iframe>
          </KeepAlive>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <MapSvg style="max-height: 100%;" v-animate-on-scroll/>

        <div class="map-description mb-2">
          <v-icon icon="fas fa-location-dot" size="24" class="mb-1"/>
          г. Смоленск, ул. Попова 125
        </div>

        <a 
          href="https://vk.com/technoxus_smol"
          target="_blank"
          rel="noopener noreferrer"
          class="text-black map-description"
          style="text-decoration: none; cursor: pointer;"
        >
          <v-icon icon="fab fa-vk" size="28" class="mb-1"/>
          ВКонтакте
          <v-icon icon="fas fa-arrow-up-right-from-square" size="16" class="mb-1"/>
        </a>

        <div class="mt-2">
          <iframe
            src="https://yandex.ru/sprav/widget/rating-badge/127607219934?type=rating"
            width="150"
            height="50"
            frameborder="0"
          ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import MapSvg from '@/components/svg/MapSvg.vue'
import { slideLeft, fadeIn } from '@/scripts/animations'
import { gsap } from 'gsap/all'
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const display = useDisplay()

slideLeft('.map-title')
fadeIn('.map-description')

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.map-container',
      start: 'center bottom',
      end: '+=150px',
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

.map-description {
  font-size: 18px !important;
}
</style>