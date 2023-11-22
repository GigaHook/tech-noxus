<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="7" xl="6" xxl="4">
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
    </v-row>
  </v-container>
</template>

<script setup>
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

.calendar-circle {

}
</style>