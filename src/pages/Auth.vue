<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" lg="4" xl="3">
        <v-card>
          <v-card-title class="text-h5 mb-4">
            Авторизация
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="submit"
              :readonly="loading"
            >
              <v-text-field
                v-model="formData.login"
                label="Логин"
                :rules="[rules.required, rules.range]"
                :error-messages="loginError"
                @update:model-value="loginError = null"
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
                variant="flat"
                color="amber-accent-3"
                :loading="loading"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/scripts/api'
import { useRouter } from 'vue-router'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  range: v => (v?.length <= 20 && v?.length >= 4) || 'От 4 до 20 символов',
}

const { login } = useAuth()
const router = useRouter()
const form = ref()
const loading = ref(false)
const loginError = ref()
const formData = ref({
  login: '',
  password: '',
})

async function submit() {
  await form.value.validate()
  if (!form.value.isValid) return

  loading.value = true

  try {
    await login(formData.value)
  } catch (error) {
    loginError.value = error.response?.data.message
    form.value.items[1].reset()
  } finally {
    loading.value = false
  }
  
  if (!loginError.value) router.push('/')
}

</script>