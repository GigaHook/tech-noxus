<template>
  <v-app-bar scroll-behavior="elevate">
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
        v-if="route.name == 'Home'"
        vertical
        class="mx-2"
        key="divider"
      />

      <v-btn
        @click="router.push('/')" 
        :active="route.name == 'Home'"
        key="toHome"
        class="rounded me-2"
        text="Главная"
        prepend-icon="fas fa-home"
        stacked
        
      />

      <v-btn
        @click="router.push('/partners')"
        :active="route.name == 'Partners'"
        key="toPartners"
        class="rounded me-2"
        prepend-icon="fas fa-handshake"
        text="Партнёры"
        stacked
      />

      <v-btn
        @click="router.push('/partners')"
        :active="route.name == 'Partners'"
        key="toPartners"
        class="rounded me-2"
        prepend-icon="mdi mdi-post"
        text="Блог"
        stacked
      />
    </v-slide-x-reverse-transition>
    
    <v-app-bar-nav-icon
      v-else
      @click="side = !side"
      class="pb-1"
    />

    <v-btn
      v-if="store.user"
      :active="adminSide"
      @click="adminSide = !adminSide"
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

  <v-navigation-drawer
    v-if="store.user"
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
        @click="handleLogout"
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
import { useIntersectionObserver } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/api'
import useStore from '@/composables/useStore'

const { mobile } = useDisplay()
const { logout } = useAuth()
const router = useRouter()
const route = useRoute()
const store = useStore()
const side = ref(false)
const btnVisible = ref(false)
const adminSide = ref(false)

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

//желтая кнопочка "записаться" в хедере
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

function handleLogout() {
  adminSide.value = false
  //редирект после логаута если
  logout().then(() => {
    if (route.matched[0].beforeEnter.name == 'adminGuard') {
      router.push('/')
    }
  })
}
</script>