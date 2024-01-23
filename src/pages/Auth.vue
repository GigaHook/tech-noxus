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
                :error-messages="errors.login"
                @update:model-value="errors.login = null"
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

        <v-card class="mt-2" v-if="store.user">
          <v-card-text>
            {{ store.user }}
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
import { useAuth } from '@/composables/api'
import { useRouter } from 'vue-router'
import useStore from '@/composables/useStore'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  range: v => (v?.length <= 20 && v?.length >= 4) || 'От 4 до 20 символов',
}

const { login, logout } = useAuth()
const router = useRouter()
const store = useStore()
const form = ref()
const errors = ref({})
const formData = ref({
  login: '',
  password: '',
})

async function submit() {
  if (!(await form.value.validate())) return
  errors.value = await login(formData)
  if (!errors.value.login) router.push('/')
}

</script>