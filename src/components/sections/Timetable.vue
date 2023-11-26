<template>
  <v-container class="my-16">
    <v-row justify="space-around" align="center">
      <v-col
        v-if="display.mdAndUp.value"
        md="1"
        class="clock d-flex justify-center align-center"
      >
        <v-icon
          icon="far fa-clock"
          color="grey-lighten-1"
          size="175"
          class="clock-icon clock-icon-1"
        />
      </v-col>

      <v-col cols="12" md="7" lg="6" xl="5" xxl="4" style="z-index: 1;">
        <v-card
          elevation="12"
          style="border-radius: 2rem; overflow: visible !important;"
        >
          <v-sheet
            class="d-flex justify-center align-center position-relative"
            style="height: 60px; border-top-left-radius: 2rem; border-top-right-radius: 2rem;"
            color="amber-accent-3"
          >
            <div class="calendar calendar-left"></div>
            <div class="calendar calendar-right"></div>

            <h2 class="text-h4">Расписание занятий</h2>
          </v-sheet>
        
          <v-row justify="center" class="text-h6 text-center">
            <v-col cols="4" class="ma-4">
              <h3 class="text-h5">Суббота</h3>
              <div v-for="day in saturday" class="mt-2">
                {{ day.title }} <br>
                {{ day.time }}
              </div>
            </v-col>
          
            <v-col cols="4" class="ma-4">
              <h3 class="text-h5 text-center">Воскресенье</h3>
              <div v-for="day in sunday" class="mt-2">
                {{ day.title }} <br>
                {{ day.time }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col
        v-if="display.mdAndUp.value"
        md="1"
        class="clock d-flex justify-center align-center flex-column"
      >
        <v-icon
          icon="far fa-calendar-days"
          color="grey-lighten-1"
          size="175"
          class="clock-icon clock-icon-3"
        />
        <v-icon
          icon="far fa-hourglass"
          color="grey-lighten-1"
          size="175"
          class="clock-icon clock-icon-2"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { onMounted } from 'vue'
import { gsap } from 'gsap/all'

const saturday = [
  {
    title: 'Первая группа',
    time: '12:00 - 13:30'
  },
  {
    title: 'Вторая группа',
    time: '14:00 - 15:30'
  },
  {
    title: 'Третья группа',
    time: '16:00 - 17:30'
  }
]

const sunday = [
  {
    title: 'Первая группа',
    time: '12:00 - 13:30'
  },
  {
    title: 'Вторая группа',
    time: '14:00 - 15:30'
  },
  {
    title: 'Третья группа',
    time: '16:00 - 17:30'
  }
]

const display = useDisplay()

onMounted(() => {
  //часы круглые
  gsap.timeline({
    scrollTrigger: {
      trigger: '.clock-icon-1',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    }
  })
  .set('.clock-icon-1', {
    x: '-100%',
    y: '-240%',
    opacity: 0,
    scale: 1.3,
    rotation: -60,
  })
  .to('.clock-icon-1', {
    x: '25%',
    y: '-25%',
    opacity: 1,
    scale: 1,
    rotation: 0,
    ease: 'none',
  })
  .to('.clock-icon-1', {
    x: '25%',
    y: '25%',
    opacity: 1,
    scale: 1,
    rotation: 180,
    ease: 'none',
  })
  .to('.clock-icon-1', {
    x: '-150%',
    y: '120%',
    opacity: 0,
    scale: 1.5,
    rotation: 260,
    ease: 'none',
  })

  //часы песочные
  gsap.timeline({
    scrollTrigger: {
      trigger: '.clock-icon-2',
      start: 'top-=50px bottom',
      end: 'bottom top+=100px',
      scrub: 2,
    }
  })
  .set('.clock-icon-2', {
    x: '175%',
    y: '-200%',
    opacity: 0,
    scale: 1.2,
    rotation: 360,
  })
  .to('.clock-icon-2', {
    x: '50%',
    y: '50%',
    opacity: 1,
    scale: 1,
    rotation: 200,
    ease: 'none',
  })
  .to('.clock-icon-2', {
    x: '50%',
    y: '50%',
    opacity: 1,
    scale: 1,
    rotation: 80,
    ease: 'none',
  })
  .to('.clock-icon-2', {
    x: '200%',
    y: '100%',
    opacity: 0,
    scale: 1.2,
    rotation: 0,
    ease: 'none',
  })

  //календарь
  gsap.timeline({
    scrollTrigger: {
      trigger: '.clock-icon-3',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    }
  })
  .set('.clock-icon-3', {
    x: '175%',
    y: '-200%',
    opacity: 0,
    scale: 1.2,
    rotation: 35,
  })
  .to('.clock-icon-3', {
    x: '0%',
    y: '-25%',
    opacity: 1,
    rotation: -25,
    scale: 1,
    ease: 'none',
  })
  .to('.clock-icon-3', {
    x: '-25%',
    y: '25%',
    opacity: 1,
    rotation: -35,
    scale: 1,
    ease: 'none',
  })
  .to('.clock-icon-3', {
    x: '-100%',
    y: '100%',
    opacity: 0,
    scale: 1.2,
    rotation: -165,
    ease: 'none',
  })
})
</script>

<style scoped>
.calendar-left {
  left: 10%;
}

.calendar-right {
  right: 10%;
}

.calendar {
  position: absolute;
  background-color: #444;
  width: 16px;
  height: 60px;
  border-radius: 6px;
  top: -30px
}
</style>