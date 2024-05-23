<template>
  <v-container class="h-100">
    <v-row justify="center" align="center" class="h-100">
      <v-col cols="12" lg="5" xl="4">
        <v-card>
          <v-card-title>
            {{ $state.postBeingEdited.value ? 'Изменить новость' : 'Добавить новость' }}
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
                :rules="$state.postBeingEdited.value ? [] : [rules.image]"
                :error-messages="errors.image"
                :prepend-icon="$state.postBeingEdited.value ? 'mdi mdi-image-edit' : 'mdi mdi-image-plus'"
                @update:model-value="delete errors.image"
                show-size
              />

              <v-btn
                type="submit"
                :text="$state.postBeingEdited.value ? 'Изменить' : 'Добавить'"
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
import { ref, shallowRef, onActivated, onDeactivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePosts } from '@/scripts/api'
import { useState } from '@/scripts/store'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  image:    v => !!v?.[0] || 'Это поле нужно заполнить',
}

const { createPost, updatePost } = usePosts()
const router = useRouter()
const route = useRoute()
const state = useState()
const form = ref()
const loading = shallowRef(false)
const errors = ref({})
const formData = ref({
  title: null,
  text:  null,
  image: null,
})

onActivated(() => {
  if (route.params.id && !state.postBeingEdited.value) {
    router.push('/posts')
  }

  if (state.postBeingEdited.value) {
    formData.value.title = state.postBeingEdited.value.title
    formData.value.text = state.postBeingEdited.value.fulltext
  }
})

onDeactivated(() => {
  state.postBeingEdited.value = null
  formData.value = {
    title: null,
    text:  null,
    image: null,
  }
})

async function submit() {
  await form.value.validate()
  if (!form.value.isValid) return

  loading.value = true

  try {
    if (state.postBeingEdited.value) {
      await updatePost(route.params.id, formData.value)
    } else {
      await createPost(formData.value)
    }
  } catch (error) {
    errors.value = error.response?.errors
  } finally {
    loading.value = false
  }
  
  Object.keys(errors.value).length || router.push('/posts')
}

</script>