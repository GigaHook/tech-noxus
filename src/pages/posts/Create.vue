<template>
  <v-container class="h-100">
    <v-row justify="center" align="center" class="h-100">
      <v-col cols="12" lg="5" xl="4">
        <v-card>
          <v-card-title>
            {{ $store.postBeingEdited.value ? 'Изменить новость' : 'Добавить новость' }}
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
                :rules="$store.postBeingEdited.value ? [] : [rules.image]"
                :error-messages="errors.image"
                :prepend-icon="$store.postBeingEdited.value ? 'mdi mdi-image-edit' : 'mdi mdi-image-plus'"
                @update:model-value="delete errors.image"
                show-size
              />

              <v-btn
                type="submit"
                :text="$store.postBeingEdited.value ? 'Изменить' : 'Добавить'"
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
import { useStore } from '@/scripts/store'

const rules = {
  required: v => !!v || 'Это поле нужно заполнить',
  image:    v => !!v?.[0] || 'Это поле нужно заполнить',
}

const { createPost, updatePost } = usePosts()
const router = useRouter()
const route = useRoute()
const store = useStore()
const form = ref()
const loading = shallowRef(false)
const errors = ref({})
const formData = ref({
  title: null,
  text:  null,
  image: null,
})

onActivated(() => {
  if (route.params.id && !store.postBeingEdited.value) {
    router.push('/posts')
  }

  if (store.postBeingEdited.value) {
    formData.value.title = store.postBeingEdited.value.title
    formData.value.text = store.postBeingEdited.value.fulltext
  }
})

onDeactivated(() => {
  store.postBeingEdited.value = null
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
    if (store.postBeingEdited.value) {
      console.log('из create')
      console.log(formData.value)
      console.log(formData.value.title)
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