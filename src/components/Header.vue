<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <div class="d-flex flex-no-wrap align-center">
        <v-img
          src="@/assets/logo.png"
          max-width="60"
        /> <!--ПЕРЕДЕЛАТЬ КАРТИНКУ-->
        <div class="ms-2">TechNoxus</div>
      </div>
    </v-app-bar-title>

      <v-btn>
        О нас
      </v-btn>

      <v-btn>
        особенности
      </v-btn>
      
      <v-btn>
        курсы
      </v-btn>

      <v-btn>
        расписание
      </v-btn>

      <v-btn icon="mdi-home"/>
  </v-app-bar>
</template>

<script setup>

</script>