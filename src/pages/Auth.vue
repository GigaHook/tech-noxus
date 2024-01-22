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
                v-model="formData.login"
                label="Логин"
                :rules="[rules.required, rules.range]"
              />

              <v-text-field
                v-model="formData.password"
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
        </v-card>

        <v-card class="mt-2" v-if="user">
          <v-card-text>
            {{ user }}
          </v-card-text>

          <v-card-actions>
            <v-btn @click="asd">
              Выйти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { useFetch, useStorage } from '@vueuse/core'
import { useAuth } from '@/composables/api'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  range: v => (v?.length <= 20 && v?.length >= 4) || 'От 4 до 20 символов',
}

const form = ref()
const formData = ref({
  login: '',
  password: '',
})

const user = useStorage('user')
const { login, logout } = useAuth()

async function submit() {
  await form.value.validate()

  if (!form.value.isValid) return

  try {
    await login(formData)
  } catch (error) {

  }
}

async function asd() {
  await logout()
  console.log(user.value)
  const user2 = useStorage('user')
  console.log(user2.value)
}

</script>