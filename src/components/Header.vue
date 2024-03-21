<template>
  <v-app-bar>
    <v-app-bar-title>
      <div class="d-flex flex-no-wrap align-center" style="max-width: fit-content !important;">
        <v-img src="@/assets/images/logo.png" width="64"/>
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
          v-for="item in homeMenu"
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
        v-if="route.name == 'Home'"
        vertical
        class="mx-2"
        key="divider"
      />

      <v-btn
        v-for="(item, index) in navMenu"
        @click="router.push(item.path)"
        :active="route.path == item.path"
        :key="index"
        :prepend-icon="item.icon"
        :text="item.text"
        stacked
        class="rounded me-2"
      />
    </v-slide-x-reverse-transition>
    
    <v-app-bar-nav-icon
      v-else
      @click="side = !side; adminSide = false"
      class="pb-1"
    />

    <v-btn
      v-if="user"
      :active="adminSide"
      @click="adminSide = !adminSide; side = false"
      key="adminSide"
      class="rounded me-2"
      icon
      variant="flat"
      color="amber-accent-3"
    >
      <v-icon icon="fas fa-key" class="mb-1"/>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-if="mobile"
    location="right"
    v-model="side"
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in navMenu"
        @click="router.push(item.path)"
        :active="route.path == item.path"
        :key="index"
        :prepend-icon="item.icon"
      >
        {{ item.text }}
      </v-list-item>

      <template v-if="route.name == 'Home'">
        <v-divider/>
        <v-list-item
          v-for="item in homeMenu"
          :key="item.id"
          v-scroll-to="item.id"
          v-once
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
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-if="user"
    location="right"
    v-model="adminSide"
  >
    <v-list>
      <v-list-item
        @click="router.push('/posts/create'); adminSide = !adminSide"
        :active="route.name == 'PostsCreate'"
        prepend-icon="mdi mdi-plus-box"
      >
        Добавить пост
      </v-list-item>

      <v-divider/>
      
      <v-list-item
        @click="handleLogout(); adminSide = !adminSide"
        prepend-icon="mdi mdi-logout"
      >
        Выйти
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref, watchEffect } from 'vue'
import { useIntersectionObserver, useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/scripts/api'
import useStore from '@/scripts/store'

const { mobile } = useDisplay()
const { logout } = useAuth()
const router = useRouter()
const route = useRoute()
const store = useStore()
const side = ref(false)
const btnVisible = ref(false)
const adminSide = ref(false)
const user = useStorage('user', null)

const homeMenu = [
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

const navMenu = [
  {
    text: 'Главная',
    path: '/',
    icon: 'fas fa-home',
  },
  {
    text: 'Блог',
    path: '/posts',
    icon: 'mdi mdi-post',
  },
  {
    text: 'Партнёры',
    path: '/partners',
    icon: 'fas fa-handshake',
  },
]

//желтая кнопочка "записаться" в хедере
watchEffect(() => {
  if (store.heroBtn && route.name == 'Home') {
    useIntersectionObserver(
      store.heroBtn, ([{ isIntersecting }]) => btnVisible.value = !isIntersecting
    )
  }
})

//редирект после логаута
async function handleLogout() {
  await logout()

  if (route.matched[0]?.beforeEnter?.name == 'adminGuard') {
    router.push('/')
  }

  user.value = null
}
</script>