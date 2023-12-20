<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <v-card elevation="12" class="mb-12" style="position: relative !important">
          <v-fade-transition group leave-absolute>
            <v-card-title
              class="mb-4"
              :style="{
                opacity: status ? 0 : 1
              }"
              key="cardTitle"
            >
              <h2 class=text-h4>
                Заказать карту
              </h2>

              <div class="text-h6 text-wrap">
                Оставьте свою заявку и мы свяжемся с вами
              </div>

              <div class="text-h1">
                ПЕРЕДЕЛАТЬ
              </div>
            </v-card-title>

            <v-card-text
              :style="{
                opacity: status ? 0 : 1
              }"
              key=cardText
            >
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

                    <CourseTypeChip
                      v-if="course" 
                      :type="course?.type"
                    />
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
                      @mouseover="hover = true"
                      @mouseleave="hover = false"
                      :elevation="hover ? 8 : 0"
                      type="submit"
                      color="amber-accent-3"
                    >
                      Заказать
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-text
              v-if="status == 'loading'"
              class="d-flex justify-center align-center center"
              key="cardText2"
            >
              <v-progress-circular
                indeterminate
                size="100"
                color="amber-accent-3"
              />
            </v-card-text>

            <v-card-text
              v-if="status == 'submitted'"
              class="d-flex justify-center align-center center"
              key="cardText3"
            >
              <div class="text-center">
                <v-icon
                  icon="far fa-check-circle"
                  color="amber-accent-3"
                  size="100"
                />
                <div class="text-h4">
                  Заявка отправлена
                </div>

                <div class="text-h5">
                  Мы свяжемся с вами в ближайшее время
                </div>
              </div>
            </v-card-text>
          </v-fade-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const status = ref(false)
const hover = ref(false)
const form = ref()
const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  tooLong: v => v?.length <= 100 || 'Слишком длинное значение',
}

function submit() {

}
</script>