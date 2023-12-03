<template>
  <v-col cols="6" md="4" lg="3">
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 20 : 8"
      class="course-card d-flex flex-column pa-3"
      ref="card"
      :style="{
        transform: !display.mobile.value && cardTransform,
        transition: 'all .1s ease-out',
      }"
    >
      <div class="h-50 mb-auto">
        <v-img
          :src="course.img"
          class="h-100"
        />
        
        <div class="text-h6">
          {{ course.title }}
        </div>
      </div>

      <div>
        <CourseTypeChip :type="course.type" class=""/>

        <div class="text-h6 ms-1">
          {{ course.price }} 
          <v-icon
            icon="mdi mdi-currency-rub"
            class="mb-1 ms-n2"
            size="22"
          />
        </div>

        <div class="d-flex justify-space-between align-center w-100">
          <v-btn
            @click="applyForCourse"
            variant="flat"
            color="amber-accent-3"
          >
            Записаться
          </v-btn>
  
          <v-btn size="small" variant="plain" @click="overlay = true">
            Подробнее
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-overlay
      v-model="overlay"
      class="d-flex justify-center align-center"
      scroll-strategy="none"
    >
      <v-card
        class="pa-3 position-relative"
        style="width: clamp(720px, 75vw, 1080px); height: clamp(640px, 75vh, 900px);"
      >
        <v-row :style="display.mobile.value && 'max-height: 100%; overflow-y: scroll;'">
          <v-col cols="12" md="5" class="d-flex flex-column h-100">
            <v-img :src="course.img" class="align-self-stretch"/>

            <div
              v-if="!display.mobile.value"
              class="text-h5 ms-1 mb-1"
            >
              {{ course.price }} 
              <v-icon
                icon="mdi mdi-currency-rub"
                class="mb-1 ms-n2"
                size="22"
              />
            </div>

            <v-btn
              v-if="!display.mobile.value"
              @click="applyForCourse"
              variant="flat"
              color="amber-accent-3 w-50"
            >
              Записаться
            </v-btn>
          </v-col>

          <v-col
            cols="12" md="7"
            :class="!display.mobile.value && 'd-flex flex-column'"
            style="height: clamp(640px, 75vh, 900px);"
          >
            <div class="text-h5 mb-2">
              {{ course.title }}
            </div>

            <CourseTypeChip :type="course.type" class="mb-2"/>

            <div
              class="align-self-stretch"
              style="overflow-y: scroll;"
              v-html="course.description"
            ></div>

            <div
              v-if="display.mobile.value"
              class="text-h5 mx-1 d-inline-flex align-center mt-2"
            >
              {{ course.price }} 
              <v-icon
                icon="mdi mdi-currency-rub"
                size="22"
              />
            </div>

            <v-btn
              v-if="display.mobile.value"
              @click="applyForCourse"
              variant="flat"
              color="amber-accent-3 w-50 mt-n2"
            >
              Записаться
            </v-btn>
          </v-col>
        </v-row>

        <v-btn
          @click="overlay = false"
          variant="plain"
          class="position-absolute"
          style="right: 5px; top: 5px;"
          icon="mdi mdi-close"
        />
      </v-card>
    </v-overlay>
  </v-col>  
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/useStore'

const { course, index, data } = defineProps({ 
  course: Object,
  index: Number,
  data: Object,
})

const display = useDisplay()
const hover = ref()
const card = ref()
const overlay = ref(false)
const store = useStore()

const {
  elementX,
  elementY,
  isOutside,
  elementHeight,
  elementWidth,
} = useMouseInElement(card)

const cardTransform = computed(() => {
  if (!display.mobile.value) {
    const MAX_ROTATION = 4
  
    const rX = (
      MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION
    ).toFixed(2)
  
    const rY = (
      (elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2
    ).toFixed(2)
  
    return isOutside.value 
      ? ''
      : `perspective(${elementWidth.value}px) rotateX(${-rX}deg) rotateY(${-rY}deg) scale(1.05)`
  }

  return ''
})

function applyForCourse() {
  store.selectedCourse = course
  overlay.value = false
  data.form.$el.scrollIntoView({ 
    behavior: 'smooth',
    block: 'center',
  })
}
</script>

<style scoped>
.course-card {
  height: 380px;
  max-width: 320px;
}
</style>
