<template>
  <v-container
    fluid
    class="container"
    :class="!mobile && 'image'"
    :style="mobile && 'margin-top: 60px'"
    id="hero"
  >
    <v-row justify="end" align="center">
      <v-col cols="12" lg="6">
        <div 
          :style="{
            height: !mobile ? '30%' : '',
            width: !mobile ? '80%' : '90vw',
          }"
          :class="mobile && 'mt-n4'"
        >
          <v-img
            src="@/assets/images/technoxus_logo_2.png"
            class="slide-0"
            :class="!mobile && 'ms-n9'"
            eager
          />
        </div>

        <div
          class="slide-1"
          :class="mobile ? 'text-h5' : 'text-h3 mt-2'"
        >
          <div>Школа технологий для детей</div>
          <div>г. Смоленск</div>
          <div class="text-h6 mb-2">
            Преподаём для детей от 5 до 15 лет
          </div>
        </div>

        <template v-if="!mobile">
          <v-sheet
            class="slide-2 shine"
            elevation="24"
          >
            <v-btn
              v-scroll-to="'#form'"
              size="x-large"
              color="amber-accent-3"
              class="button"
              ref="heroBtn"
            >
              Записаться
            </v-btn>
          </v-sheet>

          <a
            href="https://vk.com/technoxus_smol"
            target="_blank"
            rel="noopener noreferrer"
            class="text-black fade-in"
          >
            <v-btn
              variant="text"
              size="large"
              class="font-weight-bold mt-6"
              v-ripple="{ class: `text-yellow` }"
              prepend-icon="fab fa-vk"
            >
              ВКонтакте
            </v-btn>
          </a>
        </template>
      </v-col>

      <v-col cols="12" lg="5" class="pt-4">
        <HeroSvg
          :class="mobile ? 'mt-n16 mb-n4' : 'mx-n4'"
          :style="mobile && 'max-height: 50vh'"
        />

        <template v-if="mobile">
          <div class="d-flex flex-no-wrap justify-space-between pb-2 fade-in">
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
          </div>

          <v-sheet
            class="mt-2 slide-2 shine w-100"
            elevation="24"
          >
            <v-btn
              v-scroll-to="'#form'"
              size="x-large"
              color="amber-accent-3"
              class="button w-100"
              v-ripple="{ class: `text-yellow` }"
            >
              Записаться
            </v-btn>
          </v-sheet>

          <div class="w-100 text-center mt-4 fade-in">
            Преподаём для детей от 5 до 15 лет
          </div>
  
          <div class="d-flex justify-center fade-in">
            <v-btn
              v-scroll-to="'#about'"
              append-icon="fa fa-arrow-down"
              variant="text"
              size="x-large"
              class="pb-2 mt-2"
              style="z-index: 1;"
              v-ripple="{ class: `text-yellow` }"
              stacked
            >
              Интересно? листай ниже
            </v-btn>
          </div>
        </template>
      </v-col>

      <v-col cols="12" class="text-center">
        <v-btn
          v-if="!mobile"
          v-scroll-to="'#about'"
          variant="text"
          append-icon="fa fa-arrow-down"
          v-ripple="{ class: `text-yellow` }"
          stacked
        >
          Интересно? листай ниже
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import useStore from '@/composables/useStore'
import HeroSvg from '@/components/svg/HeroSvg.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { gsap } from 'gsap/all'
import { ref, onMounted } from 'vue'

const { mobile } = useDisplay()
const store = useStore()
const heroBtn = ref()

const slides = ['.slide-0', '.slide-1', '.slide-2']

onMounted(() => {
  store.heroBtn = heroBtn

  gsap.timeline()
    .set(slides, {
      opacity: 0,
      x: '-100%',
      stagger: true,
    })
    .set('.fade-in', {
      opacity: 0
    })
    .to('.slide-0', {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'back.out',
    })
    .to('.slide-1', {
      opacity: 1,
      x: 0,
      duration: .5,
      ease: 'back.out',
    })
    .to('.slide-2', {
      opacity: 1,
      x: 0,
      duration: .5,
      ease: 'back.out',
    })
    .to('.fade-in', {
      opacity: 1,
      duration: .5,
    })
})
</script>

<style scoped>
.container {
  min-height: calc(90vh - 60px);
  height: fit-content;
}

.image {
  position: relative;
}

.image::after {
  background-image: url('@/assets/images/hero_circuits.png');
  background-position: start center;
  background-size: contain;
  background-repeat: no-repeat;
  content: '';
  opacity: 0.75;
  z-index: -1;
  position: absolute;
  top: 50%; 
  left: 0;
  translate: 0 -50%;
  width: 55vw;
  height: 80%;
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