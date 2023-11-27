<template>
  <v-app-bar flat>
    <v-app-bar-title @click="navigate(store.hero)">
      <div class="d-flex flex-no-wrap align-center">
        <v-img
          src="@/assets/images/logo.png"
          max-width="60"
        />
        <div class="ms-2">TechNoxus</div>
      </div>
    </v-app-bar-title>

    <template v-if="!mobile">
      <v-btn
        v-for="item in menuItems"
        @click="navigate(item.to)"
      >
        {{ item.text }}
      </v-btn>
    </template>
    
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
      item-value="to"
      @update:selected="selected => navigate(selected[0])"
    />
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import useStore from '@/composables/useStore'
import { ref, computed } from 'vue'

const { mobile } = useDisplay()
const store = useStore()
const side = ref(false)
const menuItems = computed(() => [
  {
    text: 'О нас',
    to: store.about,
  },
  {
    text: 'Расписание',
    to: store.timetable,
  },
  {
    text: 'Курсы',
    to: store.courses,
  },
  {
    text: 'Мы на карте',
    to: store.map,
  },
  {
    text: 'Партнёры',
    to: store.partners,
  },
  {
    text: 'Записаться',
    to: store.form,
  }
])

function navigate(section) {
  section.$el.scrollIntoView({ behavior: "smooth" })
}
</script>