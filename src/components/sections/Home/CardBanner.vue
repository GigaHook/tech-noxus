<template>
  <v-container class="px-8 mb-8" id="partners">
    <v-row justify-md="space-around" justify-lg="center">
      <AboutRow 
        title="Партнёрская программа"
        :img="CardBannerSvg"
      >
        Наши ученики имеют возможность получить карту лояльности, дающую множество скидок в разных заведениях нашего города
        <br>
        <v-btn
          class="my-6"
          :class="mobile && 'w-100'"
          :elevation="mobile ? 9 : 16"
          size="large"
          color="amber-accent-3"
          @click="handleClick"
        >
          Узнать больше
        </v-btn>
      </AboutRow>
    </v-row>
  </v-container>
</template>

<script setup>
import AboutRow from '@/components/AboutRow.vue'
import CardBannerSvg from '@/components/svg/CardBannerSvg.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useRouter } from 'vue-router'

const { mobile } = useDisplay()
const router = useRouter()

function handleClick() {
  router.push('/partners').then(() => {
    //window.scrollTo(0, 0)
  })
}
</script>