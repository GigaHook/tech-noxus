<template>
  <v-container class="pcard-hero-bg">
    <v-row
      justify="space-between"
      justify-xl="space-around"
      align="center"
      :style="!display.mobile.value && 'height: 50vh'"
    >
      <v-col cols="12" lg="7" xl="6">
        <div class="text-h2 mb-4">
          Карта лояльности для учащегося
        </div>

        <div class="text-h4">
          Получите доступ к эксклюзивным скидкам и бонусам в десятках магазинов города с нашей новой картой лояльности
        </div>
      </v-col>

      <v-col cols="12" lg="5" xl="4">
        <v-sheet
          elevation="10"
          ref="pcard"
        >
          <v-img src="@/assets/images/partner-card.png" cover/>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { parallaxAngle } from '@/composables/useAnimations'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const display = useDisplay()
const pcard = ref()

onMounted(() => {
  parallaxAngle(pcard, -4, false)
})
</script>

<style scoped>
.pcard-hero-bg::before {
  content: '';
  width: 100vw;
  height: 50vh;
  position: absolute;
  z-index: -1;
  background-image: url(@/assets/images/partner-hero-bg3.png);
  background-size: 100vw;
  background-position: center right;
}
</style>