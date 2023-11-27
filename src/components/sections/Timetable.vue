<template>
  <v-container class="my-16 pt-16">
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <v-sheet
          elevation="12"
          style="outline: 2px solid #9e9e9e"
          ref="timetable"
        >
          <v-sheet
            color="grey-lighten-2"
            class="pa-1 d-flex justify-space-between"
            style="border-bottom: 2px solid #9e9e9e"
          >
            <h2 class="text-h6 ps-2"  style="font-family: 'BrassMono';">
              Расписание
            </h2>

            <div>
              <v-btn
                icon="mdi mdi-minus"
                size="30"
                rounded
                variant="flat"
                class="me-1 text-grey-darken-1"
              />
              
              <v-btn
                icon="mdi mdi-square-outline"
                size="30"
                rounded
                variant="flat"
                class="me-1 text-grey-darken-1"
              />

              <v-btn
                icon="mdi mdi-close"
                size="30"
                color="red-lighten-2"
                rounded
                variant="flat"
              />
            </div>
          </v-sheet>

          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title class="text-h5">
                    Суббота
                  </v-card-title>
                
                  <v-card-text class="text-h6">
                    <div v-for="day in saturday" class="text-h6">
                      {{ day.title }} - {{ day.time }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title class="text-h5">
                    Воскресенье
                  </v-card-title>
                
                  <v-card-text class="text-h6">
                    <div v-for="day in sunday" class="text-h6">
                      {{ day.title }} - {{ day.time }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref } from 'vue'

const display = useDisplay()
const timetable = ref()

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