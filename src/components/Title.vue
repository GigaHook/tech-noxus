<template>
  <h2 class="text-h4 pa-2 px-4 title">
    <div class="slot">
      # <slot/>
    </div>
  </h2>
</template>

<style scoped>
.title {
  opacity: 0;
  width: fit-content;
  background-color: #ffc400;
  color: white;
  transform: skewX(-45deg);
}

.slot {
  transform: skewX(45deg);
}
</style>