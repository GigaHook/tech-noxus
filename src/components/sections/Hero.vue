<template>
  <v-container class="container image" fluid>
    <div class="d-flex flex-column justify-center" style="translate: 10%;">
      <!--<v-card
        color="black"
        variant="flat"
        class="text-h3 px-6 py-2 light-speed-left"
        rounded="xl"
        style="width: fit-content"
      >
        <span class="text-amber-accent-3">T</span>EC<span class="text-amber-accent-3">H</span>
      </v-card>

      <div class="text-h1 slide-left-delay-1" elevation="3">
        NOXUS
      </div>-->

      <div style="width: 90%; height: 30%;">
        <v-img
          src="@/assets/hero_text_1.png"
          class="light-speed-left ms-n9"
          eager
        />
      </div>

      <div class="text-h3 slide-left-delay-1">
        <div>Школа технологий для детей</div>
        <div>г. Смоленск</div>
      </div>

      <v-sheet
        class="mt-6 slide-left-delay-2 shine"
        elevation="24"
      >
        <v-btn
          size="x-large"
          color="amber-accent-3"
          class="button"
        >
          Записаться
        </v-btn>
      </v-sheet>
    </div>
    
    <HeroSvg class="mt-n6"/>
  </v-container>
</template>

<script setup>
import HeroSvg from '@/components/svg/HeroSvg'
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: calc(100vh - 120px);
  height: calc(100vh - 60px);
}

.slide-left-delay-0 {
  opacity: 0;
  animation: slide-left .5s cubic-bezier(0.5, 0.9, 0.3, 1) forwards .2s;
}

.slide-left-delay-1 {
  opacity: 0;
  animation: slide-left .5s cubic-bezier(0.5, 0.9, 0.3, 1) forwards .9s;
}

.slide-left-delay-2 {
  opacity: 0;
  animation: slide-left .5s cubic-bezier(0.5, 0.9, 0.3, 1) forwards 1.2s;
}

.light-speed-left {
  animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) light-speed-left
}

@keyframes light-speed-left { 
  from {
    transform: translate3d(-50%, 0, 0) skewX(20deg);
    opacity: 0;
  }
  60% {
    transform: skewX(-10deg);
    opacity: 1;
  }
  80% {
    transform: skewX(2deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  75% {
    opacity: 1;
    transform: translateX(7%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}

.fade-in {
  opacity: 0;
  animation: 1s 1 forwards ease-in-out fade-in;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image {
  position: relative;
}

.image::after {
  background-image: url('@/assets/hero_circuits.png');
  background-color: rgba(255, 255, 255, 0.5);
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