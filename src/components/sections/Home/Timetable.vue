<template>
  <v-container class="my-16 pt-16" id="timetable">
    <v-row justify="center" align="center">
      <v-col cols="12" lg="4">
        <TimetableSvg v-animate-on-scroll/>
      </v-col>

      <v-col cols="12" lg="8" xl="6" class="position-relative overflow-visible">
        <v-row dense>
          <v-col cols="12" class="timetable-trigger">
            <h2 class="text-h4">Расписание</h2>
          </v-col>
    
          <v-col cols="12" md="6">
            <v-card variant="outlined" elevation="0">
              <v-card-title class="text-h5 timetable-title">
                Суббота
              </v-card-title>
            
              <v-card-text class="text-h6">
                <div v-for="day in saturday" class="text-h6 timetable-text" v-once>
                  {{ day.title }} - {{ day.time }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
    
          <v-col cols="12" md="6">
            <v-card variant="outlined" elevation="0">
              <v-card-title class="text-h5 timetable-title">
                Воскресенье
              </v-card-title>
            
              <v-card-text class="text-h6">
                <div v-for="day in sunday" class="text-h6 timetable-text" v-once>
                  {{ day.title }} - {{ day.time }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TimetableSvg from '@/components/svg/TimetableSvg.vue'
import { onMounted } from 'vue'
import { useTimeline } from '@/scripts/animations'

onMounted(() => {
  const tl = () => useTimeline({
    scrollTrigger: {
      trigger: '.timetable-trigger',
      start: 'center bottom',
    }
  })
  
  tl().from('.timetable-title', {
    duration: 3,
    text: '***********',
    stagger: .3,
  })

  tl().from('.timetable-text', {
    duration: 3,
    text: '*****************************',
    stagger: .4,
  })
})

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
</script>