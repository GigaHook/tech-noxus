<template>
  <v-app-bar ref="header" scroll-behavior="elevate">
    <v-app-bar-title @click="up" style="cursor: pointer">
      <div class="d-flex flex-no-wrap align-center">
        <v-img
          src="@/assets/images/logo.png"
          max-width="60"
        />
        <div class="ms-2">TechNoxus</div>
      </div>
    </v-app-bar-title>
    
    <v-slide-x-reverse-transition
      v-if="!mobile"
      group
      leave-absolute
    >
      <v-btn
        v-for="(item, index) in menuItems"
        :key="index"
        @click="scrollTo(item.ref)"
      >
        {{ item.text }}
      </v-btn>

      <v-btn @click="router.push('/partners')">
        Карта лояльности
      </v-btn>

      <v-btn
        v-if="btnVisible"
        @click="scrollToForm"
        flat
        variant="elevated"
        color="amber-accent-3"
      >
        Записаться
      </v-btn>
    </v-slide-x-reverse-transition>
    
    <v-app-bar-nav-icon
      v-else
      @click="side = !side"
      class="pb-1"
    />
    
  </v-app-bar>

  <v-navigation-drawer
    v-if="mobile"
    location="right"
    v-model="side"
  >
    <v-list
      :items="menuItems"
      item-title="text"
      item-value="ref"
      @update:selected="selected => scrollTo(selected[0])"
    />

    <v-divider/>

    <v-list-item
      @click="router.push('/partners')" 
      class="mt-2"
    >
      Карта лояльности
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter } from 'vue-router'

const { menuItems, data } = defineProps({ menuItems: Array, data: Object })
const { mobile } = useDisplay()
const router = useRouter()
const side = ref(false)
const btnVisible = ref(false)

onMounted(() => {
  useIntersectionObserver(
    data.hero.heroBtn, 
    ([{ isIntersecting }]) => btnVisible.value = !isIntersecting
  )
})

function scrollTo(elem) {
  elem.value.$el.scrollIntoView({ behavior: "smooth" })
  side.value = false
}

function scrollToForm() {
  data.form.$el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  })
}

function up() {
  data.hero.heroBody.$el.scrollIntoView({ behavior: "smooth" })
}
</script>