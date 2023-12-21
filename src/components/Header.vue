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

      <v-btn
        v-if="btnVisible && route.name == 'Home'"
        @click="scrollToForm"
        key="signUp"
        flat
        variant="elevated"
        color="amber-accent-3"
      >
        Записаться
      </v-btn>

      <v-btn
        v-if="route.name != 'Home' && !mobile"
        key="goBack"
        @click="router.push('/')"
      >
        На главную
      </v-btn>

      <v-divider vertical class="mx-2" key="divider"/>
    </v-slide-x-reverse-transition>
    
    <v-app-bar-nav-icon
      @click="side = !side"
      class="pb-1"
    />
  </v-app-bar>

  <v-navigation-drawer
    location="right"
    v-model="side"
  >
    <v-list>
      <template v-if="mobile">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="scrollTo(item.ref)"
        >
          {{ item.text }}
        </v-list-item>

        <v-divider/>
      </template>

      <v-list-item
        @click="router.push('/')" 
        class="mt-2"
        :active="route.name == 'Home'"
        prepend-icon="fas fa-home"
      >
        Главная
      </v-list-item>

      <v-list-item
        @click="router.push('/partners')" 
        class="mt-2"
        :active="route.name == 'Partners'"
        prepend-icon="fas fa-handshake"
      >
        Партнёрская программа
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import useStore from '@/composables/useStore'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref, watchEffect } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

//const { menuItems, data } = defineProps({ menuItems: Array, data: Object })
const { mobile } = useDisplay()
const router = useRouter()
const route = useRoute()
const store = useStore()
const side = ref(false)
const btnVisible = ref(false)
const sections = ref()
const menuItems = ref()

watchEffect(() => {
  if (route.name == 'Home') {
    sections.value = store.homeSections
    menuItems.value = store.homeMenuItems
  } else {
    menuItems.value = []
  }

  //sections.value = {
  //  'Home': store.homeSections,
  //  'Partners': store.partnersSections,
  //}[route.name]
  //
  //menuItems.value = {
  //  'Home': store.homeMenuItems,
  //  'Partners': store.partnersMenuItems,
  //}[route.name]

  if (sections.value?.hero?.heroBtn && route.name == 'Home') {
    useIntersectionObserver(
      sections.value.hero.heroBtn, 
      ([{ isIntersecting }]) => btnVisible.value = !isIntersecting
    )
  }
})

function scrollTo(elem) {
  elem.$el.scrollIntoView({ behavior: "smooth" })
  side.value = false
}

function scrollToForm() {
  sections.value.form.$el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  })
}

function up() {
  sections.value.hero.heroBody.$el.scrollIntoView({ behavior: "smooth" })
}
</script>