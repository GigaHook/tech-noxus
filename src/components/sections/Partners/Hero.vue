<template>
  <v-container
    class="pcard-hero-bg"
    style="margin-top: 60px;"
    :style="!display.mobile.value && 'margin-bottom: 130px'"
  >
    <v-row
      justify="space-between"
      justify-xl="space-around"
      align="center"
      :style="!display.mobile.value && 'height: 50vh'"
    >
      <v-col cols="12" lg="6" xl="5">
        <div class="text-h2 mb-4 partners-hero-title-1">
          Карта лояльности для учащегося
        </div>

        <div class="text-h4 partners-hero-title-2">
          Получите доступ к скидкам и бонусам в десятках магазинов города
        </div>

        <v-sheet
            class="my-4 slide-2 shine w-50"
            elevation="24"
          >
            <v-btn
              @click="scrollToForm"
              size="x-large"
              color="amber-accent-3"
              class="button w-100"
              v-ripple="{ class: `text-yellow` }"
            >
              Оформить
            </v-btn>
          </v-sheet>

        <a
          href="https://vk.com/technoxus_smol"
          target="_blank"
          rel="noopener noreferrer"
          class="text-black"
        >
          <v-btn
            variant="text"
            class="font-weight-bold px-2"
            v-ripple="{ class: `text-yellow` }"
            append-icon="fas fa-arrow-up-right-from-square"
          >
            ВКонтакте
          </v-btn>
        </a>
      </v-col>

      <v-col cols="12" lg="5" xl="4">
        <v-img
          src="@/assets/images/partner-card.png"
          :class="`
            ${display.xlAndUp.value && 'ps-6'}
            ${display.lg.value && 'mt-8'}
          `"
          ref="pcard"
          cover
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { parallaxAngle } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { gsap } from 'gsap/all'

const display = useDisplay()
const pcard = ref()

onMounted(() => {
  if (!display.mobile.value) {
    parallaxAngle(pcard, -4, false)
  }

  gsap.fromTo('.partners-hero-title-1', {
    x: '-100%',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    delay: .5,
  })

  gsap.fromTo('.partners-hero-title-2', {
    x: '-100%',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    delay: 1,
  })
})
</script>

<style scoped>
.pcard-hero-bg {
  background-image: url(@/assets/images/partner-hero-bg3.png);
  background-position: center right;
  background-size: contain;
}
.shine {
  width: 186px; 
  position: relative; 
  overflow: hidden;
}

.shine::after {
  content: '';
  display: block;
  width: 10%; 
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: -50%;
  animation: shine 3s ease-out infinite 2s; 
  transform: skewX(-25deg);
}
@keyframes shine {
  from {
    left: -50%;
  }
  to {
    left: 600%;
  } 
}
.button:hover {
  background-color: #FF8F00 !important;
}
</style>