<template>
  <v-col cols="12" sm="6" md="4" lg="3" v-once ref="cardRoot">
    <v-card
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :elevation="hover ? 20 : 8"
      class="course-card d-flex flex-column pa-3"
      :style="display.smAndDown.value && 'max-width: 100% !important'"
      ref="card"
    >
      <div class="h-50 mb-auto">
        <v-img
          :src="assetImageUrl(course.img)"
          class="h-100"
          eager
        />
        
        <div class="text-h6">
          {{ course.title }}
        </div>
      </div>

      <div>
        <CourseTypeChip :type="course.type"/>

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
            v-scroll-to="'#form'"
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

    <!--ПОДРОБНОЕ ОПИСАНИЕ-->
    <v-overlay
      v-model="overlay"
      class="d-flex justify-center align-center"
      :scroll-strategy="display.mobile.value ? 'block' : 'none'"
      v-once
    >
      <v-card
        class="pa-3 ma-3 position-relative"
        :class="!display.mobile.value ? 'overlay-desktop' : 'overlay-mobile'"
      >
        <v-row :style="display.mobile.value && 'max-height: 100%;'">
          <v-col cols="12" md="5" class="d-flex flex-column h-100">
            <v-img
              :src="img"
              class="align-self-stretch"
              cover
              eager
            />

            <div v-if="!display.mobile.value" class="text-h5 ms-1 mb-1">
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
              v-scroll-to="'#form'"
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
              class="text-h5 d-inline-flex align-center justify-center w-25"
            >
              {{ course.price }} 
              <v-icon icon="mdi mdi-currency-rub" size="22"/>
            </div>

            <v-btn
              v-if="display.mobile.value"
              @click="applyForCourse"
              v-scroll-to="'#form'"
              variant="flat"
              color="amber-accent-3"
              class="mb-2 w-50"
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
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { parallaxAngle } from '@/scripts/animations'
import { assetImageUrl } from '@/scripts/helpers'
import useStore from '@/scripts/store'
import CourseTypeChip from '@/components/CourseTypeChip.vue'

const { course, index } = defineProps({ 
  course: Object,
  index: Number,
})

const display = useDisplay()
const hover = ref()
const card = ref()
const cardRoot = ref()
const overlay = ref(false)
const store = useStore()

function applyForCourse() {
  store.selectedCourse = course
  overlay.value = false
}

onMounted(() => {
  !display.mobile.value && parallaxAngle(card, 4)
})
</script>

<style scoped>
.course-card {
  height: 380px;
  max-width: 320px;
  transition: all .1s ease-out;
}
.course-card:hover {
  scale: 1.02
}
.overlay-desktop {
  width: clamp(720px, 75vw, 1080px);
  height: clamp(640px, 75vh, 900px);
}
.overlay-mobile {
  max-height: 100%;
  max-height: calc(100vh - 24px) !important;
  overflow-y: scroll;
}
</style>