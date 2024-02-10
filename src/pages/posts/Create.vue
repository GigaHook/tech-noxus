<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" lg="5" xl="4">
        <v-card>
          <v-card-title>
            Добавить пост
          </v-card-title>

          <v-card-text>
            <v-form
              ref=form
              @submit.prevent="submit"
              :readonly="loading"
            >
              <v-text-field
                v-model="formData.title"
                label="Заголовок"
                :rules="[rules.required]"
                :error-messages="errors.title"
                @update:model-value="delete errors.title"
              />

              <v-textarea
                v-model="formData.text"
                label="Содержание"
                :rules="[rules.required]"
                :error-messages="errors.text"
                @update:model-value="delete errors.text"
              />

              <v-file-input
                v-model="formData.image"
                label="Изображение"
                :rules="[rules.image]"
                :error-messages="errors.image"
                @update:model-value="delete errors.image"
                prepend-icon="mdi mdi-image-plus"
                show-size
              />

              <v-btn
                type="submit"
                text="Добавить"
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
import { useRouter } from 'vue-router'
import { usePosts } from '@/composables/api'

const { id } = defineProps({ id: Number })

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  image: v => !!v?.[0] || 'Это поле нужно заполнить',
}

const { create: createPost } = usePosts()
const router = useRouter()
const form = ref()
const loading = ref(false)
const errors = ref({})

const formData = ref({
  title: null,
  text: null,
  image: null,
})

async function submit() {
  await form.value.validate()
  if (!form.value.isValid) return

  loading.value = true

  try {
    await createPost(formData.value)
  } catch (error) {
    errors.value = error.response?.data.errors
  } finally {
    loading.value = false
  }
  
  if (!Object.keys(errors.value).length) router.push('/posts')
}

</script>