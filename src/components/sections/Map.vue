<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="8" xl="6">
        Тут карта будет
      </v-col>

      <v-col cols="12" lg="4">
        <RenderOnScroll style="min-height: 40vh;">
          <MapSvg/>
        </RenderOnScroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>

<style scoped>

</style>