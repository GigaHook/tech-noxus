<template>
  <v-app-bar ref="header" scroll-behavior="elevate">
    <v-app-bar-title style="cursor: pointer" v-scroll-to="'#hero'">
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
      <template v-if="route.name == 'Home'">
        <v-btn
          v-for="item in menuItems"
          :key="item.id"
          v-scroll-to="item.id"
        >
          {{ item.text }}
        </v-btn>
      </template>

      <v-btn
        v-if="btnVisible && route.name == 'Home'"
        v-scroll-to="'#form'"
        key="signUp"
        flat
        variant="elevated"
        color="amber-accent-3"
      >
        Записаться
      </v-btn>

      <v-divider
        v-if="route.name != 'Partners'"
        vertical
        class="mx-2"
        key="divider"
      />

      <v-btn
        @click="router.push('/')" 
        :active="route.name == 'Home'"
        key="toHome"
        class="rounded me-2"
        icon
      >
        <v-icon icon="fas fa-home" class="mb-1 me-1"/>

        <v-tooltip activator="parent" location="bottom">
          Главная
        </v-tooltip>
      </v-btn>

      <v-btn
        @click="router.push('/partners')"
        :active="route.name == 'Partners'"
        key="toPartners"
        class="rounded"
        icon
      >
        <v-icon icon="fas fa-handshake" class="mb-1 me-1"/>

        <v-tooltip activator="parent" location="bottom">
          Партнёрская программа
        </v-tooltip>
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
    <v-list>
      <template v-if="route.name == 'Home'">
        <v-list-item
          v-for="item in menuItems"
          :key="item.id"
          v-scroll-to="item.id"
          @click="side = !side"
        >
          {{ item.text }}
        </v-list-item>

        <v-list-item
          class="px-1 ma-1"
          v-scroll-to="'#form'"
          @click="side = !side"
        >
          <v-card
            variant="flat"
            class="rounded w-100 py-2 px-3"
            color="amber-accent-3"
          >
            Записаться
          </v-card>
        </v-list-item>

        <v-divider/>
      </template>

      <v-list-item
        @click="mobileRouter('/')" 
        class="mt-2"
        :active="route.name == 'Home'"
        prepend-icon="fas fa-home"
      >
        Главная
      </v-list-item>

      <v-list-item
        @click="mobileRouter('/partners')" 
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
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref, watchEffect } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/composables/useStore'

const { mobile } = useDisplay()
const router = useRouter()
const route = useRoute()
const store = useStore()
const side = ref(false)
const btnVisible = ref(false)

const menuItems = [
  {
    text: 'О нас',
    id: '#about',
  },
  {
    text: 'Курсы',
    id: '#courses',
  },
  {
    text: 'Расписание',
    id: '#timetable',
  },
  {
    text: 'Где нас найти',
    id: '#map',
  }
]

watchEffect(() => {
  if (store.heroBtn && route.name == 'Home') {
    useIntersectionObserver(
      store.heroBtn, ([{ isIntersecting }]) => btnVisible.value = !isIntersecting
    )
  }
})

function mobileRouter(route) {
  router.push(route).then(() => {
    window.scrollTo(0, 0)
  })
}

</script>