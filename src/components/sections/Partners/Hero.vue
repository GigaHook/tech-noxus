<template>
  <v-container
    class="mb-4"
    :class="!display.mobile.value && 'pcard-hero-bg'"
    style="margin-top: 60px;"
    id="partners-hero"
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
          Получите доступ к скидкам и бонусам в десятках заведений города
        </div>

        <v-sheet
          class="slide-2 shine my-3 partners-hero-title-3 rounded"
          :class="display.mobile.value && 'w-100'"
          elevation="24"
        >
          <v-btn
            @click="goToForm"
            size="x-large"
            color="amber-accent-3"
            class="button"
            :class="display.mobile.value && 'w-100'"
            ref="heroBtn"
          >
            Записаться
          </v-btn>
        </v-sheet>

        <div class="text-body-1 partners-hero-slide-up">
          Запишитесь на курс, чтобы бесплатно получить карту
        </div>
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
          eager
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { parallaxAngle } from '@/scripts/animations'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { gsap } from 'gsap/all'
import router from '@/plugins/router'

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
    ease: 'back.out',
  })

  gsap.fromTo('.partners-hero-title-2', {
    x: '-100%',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    delay: 1,
    ease: 'back.out',
  })

  gsap.fromTo('.partners-hero-title-3', {
    x: '-100%',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    delay: 1.5,
    ease: 'back.out',
  })

  gsap.fromTo('.partners-hero-slide-up', {
    y: '100%',
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    delay: 2.5,
    ease: 'back.out',
  })
})

function goToForm() {
  router.push('/').then(() => {
    document.querySelector('#form').scrollIntoView({ block: 'center' })
  })
}
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