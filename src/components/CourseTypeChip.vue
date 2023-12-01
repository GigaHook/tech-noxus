<template>
  <v-chip
    :color="type == 'Очное обучение' ? 'light-blue' : 'green'"
    variant="elevated"
  >
    {{ type }}
  </v-chip>

  
  <v-tooltip
    v-if="type == 'Очное обучение'"
    text="Все офлайн курсы можно также пройти в онлайн режиме"
  >
    <template #activator="{ props }">
      <v-icon
        v-bind="props"
        icon="fas fa-info-circle"
        class="ms-2"
        size="30"
        color="grey-darken-2"
      /> 
    </template>
  </v-tooltip>
</template>

<script setup>
defineProps({ type: String })
</script>