<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <v-card elevation="12" class="mb-12">
          <v-card-title class="mb-4">
            <h2 class=text-h4>Записаться на курс</h2>
            <div class="text-h6">Оставьте свою заявку и мы свяжемся с вами</div>
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="submit"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    density="comfortable"
                    v-model="name"
                    variant="outlined"
                    elevation="6"
                    color="amber-accent-3"
                    label="Имя"
                    :rules="[rules.required, rules.tooLong]"
                  >
                    <template #prepend-inner>
                      <v-icon icon="mdi mdi-account" class="me-1"/>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    density="comfortable"
                    v-model="tel"
                    type="tel"
                    v-mask="'+7 (###) ###-##-##'"
                    variant="outlined"
                    elevation="6"
                    color="amber-accent-3"
                    label="Телефон"
                    :rules="[rules.required]"
                  >
                    <template #prepend-inner>
                      <v-icon icon="mdi mdi-phone" class="me-1"/>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    density="comfortable"
                    v-model="course"
                    variant="outlined"
                    elevation="6"
                    color="amber-accent-3"
                    label="Курс"
                    :rules="[rules.required]"
                    :items="courses"
                    return-object
                  >
                    <template #prepend-inner>
                      <v-icon icon="fas fa-graduation-cap" class="me-1 mb-1"/>
                    </template>
                  </v-select>

                  <v-chip
                    v-show="course"
                    :color="course?.type == 'Очное обучение' ? 'light-blue' : 'green'"
                    variant="elevated"
                  >
                    {{ course?.type }}
                  </v-chip>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    density="comfortable"
                    v-model="contactBy"
                    variant="outlined"
                    elevation="6"
                    color="amber-accent-3"
                    label="Предпочтительный способ связи"
                    :rules="[rules.required]"
                    :items="contactItems"
                  >
                    <template #prepend-inner>
                      <v-icon icon="fas fa-envelope" class="me-1 mb-1"/>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    elevation="8"
                    color="amber-accent-3"
                  >
                    Отправить
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue'
import courses from '@/courses'
import useStore from '@/composables/useStore'

const store = useStore()

const contactItems = [
  'Написать в Телеграм',
  'Написать в WhatsApp',
  'Позвонить'
]

const form = ref()
const name = ref()
const tel = ref()
const course = ref(courses.find(course => store.selectedCourse?.name == course.title))
const contactBy = ref()

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  tooLong: v => v?.length >= 100 || 'Слишком длинное значение',
}

function submit() {
  form.value.validate().then(() => {
    if (form.value.isValid) {
      
    }
  })
}
</script>