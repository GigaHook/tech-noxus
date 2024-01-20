<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        xl="3"
      >
        <v-card>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch, useLocalStorage } from '@vueuse/core'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  range: v => (v?.length <= 20 && v?.length >= 4) || 'От 4 до 20 символов',
}

</script>