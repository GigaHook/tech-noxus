<template>
  <v-container class="mt-15">
    <v-row justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-card elevation="4">
          <v-card-title class="text-h5 mb-4">
            Авторизация
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="submit"
              
            >
              <v-text-field
                v-model="login"
                label="Логин"
                :rules="[rules.required, rules.range]"
              />

              <v-text-field
                v-model="password"
                label="Пароль"
                :rules="[rules.required, rules.range]"
                type="password"
              />

              <v-btn
                type="submit"
                text="Войти"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="getToken">
              get token
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mt-2" v-if="user">
          <v-card-text>
            {{ user }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="logout">
              Выйти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch, useStorage } from '@vueuse/core'
import axios from 'axios'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  range: v => (v?.length <= 20 && v?.length >= 4) || 'От 4 до 20 символов',
}

const form = ref()
const login = ref()
const password = ref()
const apiToken = useStorage('api-token')
const user = ref()

const { execute: getUser } = useFetch(import.meta.env.VITE_API_URL + '/user', {
  immediate: false,
  beforeFetch({ options }) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${apiToken.value}`,
    }
  },
  afterFetch(ctx) {
    console.log(ctx.data)
    user.value = ctx.data
  }
})

getUser()

const { execute: logout } = useFetch(import.meta.env.VITE_API_URL + '/logout', {
  immediate: false,
  beforeFetch({ options }) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${apiToken.value}`,
    }
  },
  afterFetch() {
    user.value = null
    //apiToken.value = ''
  }
})

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

//TODO пофиксить этот ад
function submit() {
  form.value.validate().then(() => {
    if (form.value.isValid) {
      axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie').then(() => {
        axios.post(import.meta.env.VITE_API_URL + '/login', {
          login: login.value,
          password: password.value,
        }).then(response => {
          apiToken.value = response.data['token']
          console.log(apiToken.value)
          getUser()
          axios.get(import.meta.env.VITE_API_URL + '/user').then(response => {
            console.log(response.data)
          })
        }).catch(error => {
          console.log(error)
        })
      })
    }
  })
}

</script>