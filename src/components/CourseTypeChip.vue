<template>
  <div class="d-flex flex-no-wrap">
    <v-chip
      :color="type == 'Очное обучение' ? 'light-blue' : 'green'"
      variant="elevated"
      elevation="4"
    >
      {{ type }}
    </v-chip>
    
    <v-tooltip
      v-if="type == 'Очное обучение'"
      text="Все оффлайн курсы можно также пройти в онлайн режиме"
    >
      <template #activator="{ props }">
        <v-icon
          v-bind="props"
          icon="fas fa-info-circle"
          class="ms-2"
          size="30"
          color="grey"
        /> 
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
defineProps({ type: String })
</script>