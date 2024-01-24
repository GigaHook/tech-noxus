<template>
  <v-container class="mt-15">
    <v-row justify="center">
      <v-col cols="12" lg="5" xl="4">
        <v-card>
          <v-card-title>
            Добавить пост
          </v-card-title>

          <v-card-text>
            <v-form
              ret=form
              @submit.prevent="submit"
            >
              <v-text-field
                v-model="formData.title"
                label="Заголовок"
                :rules="[rules.required]"
                :error-messages="errors.title"
                @update:model-value="errors.title = null"
              />

              <v-textarea
                v-model="formData.text"
                label="Содержание"
                :rules="[rules.required]"
                :error-messages="errors.text"
                @update:model-value="errors.text = null"
              />

              <v-file-input
                v-model="formData.image"
                label="Изображение"
                :rules="[rules.image]"
                :error-messages="errors.image"
                @update:model-value="errors.image = null"
                prepend-icon="mdi mdi-image-plus"
                show-size
                return-value="object"
              />

              <v-btn
                type="submit"
                text="Добавить"
                variant="flat"
                color="amber-accent-3"
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
import { useRouter } from 'vue-router'
import { usePosts } from '@/composables/api'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  image: v => !!v?.[0] || 'Это поле нужно заполнить',
}

const { create } = usePosts()
const router = useRouter()
const form = ref()
const errors = ref({})

const formData = ref({
  title: null,
  text: null,
  image: null,
})

async function submit() {
  console.log(formData.value)
}

</script>