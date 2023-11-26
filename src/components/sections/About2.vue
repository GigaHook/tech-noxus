<template>
  <v-container
    class="container"
    :style="display.lgAndDown.value ? 'width: 75%' : 'width: 50%'"
  >
    <v-sheet
      color="black"
      class="numbers ps-1 rounded-xl text-green-accent-2 text-h5"
    >
      {{ numbers }}
    </v-sheet>

    <v-sheet 
      class="code rounded-xl overflow-hidden"
      :style="{
        transform: codeTransform,
      }"
      ref="code"
    >
      <v-img src="@/assets/images/code3.jpg" cover/>
    </v-sheet>

    <v-sheet
      color="grey-lighten-3"
      class="image rounded-xl"
      :style="{ transform: imageTransform }"
      ref="image"
      elevation="12"
    >
      <v-container>
        <v-row>
          <v-col cols="6" class="text-h6 ps-6">
            <div class="text-h4 my-2">
              С нуля до первых проектов
            </div>
            Неважно, есть ли у вас опыт программирования или вы только делаете первые шаги в IT.
            Мы научим вас всем навыкам, необходимым для работы над реальными проектами.
            <!--Пройдя обучение на практических кейсах, вы получите реальный опыт и готовые проекты для портфолио или стартапа.-->
          </v-col>
          
          <v-col cols="6">
            <RenderOnScroll>
              <FirstProjectSvg/>
            </RenderOnScroll>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useMouseInElement } from '@vueuse/core'

const display = useDisplay()
const numbers = ref()
const code = ref()
const image = ref()

function generateNumbers() {
  let result = ''
  let value = 121

  while (value--) {
    result += Math.round(Math.random())
  }

  return result.repeat(display.mdAndDown.value ? 6 : 16)
}

function calculateTransform(elem, c) {
  function cap(value, max) {
    value > max + c && (value = max + c)
    value < -max - c && (value = -max - c)
    return value
  }

  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(elem)
  
  return computed(() => {
    const  offsetX = cap((elementX.value - elementWidth.value / 2) / c, 60 - c)
    const  offsetY = cap((elementY.value - elementHeight.value / 2) / c, 60 - c)
    return `translateX(${offsetX}px) translateY(${offsetY}px)`
  })
}

const codeTransform = calculateTransform(code, 20)
const imageTransform = calculateTransform(image, 10)

onMounted(() => {
  numbers.value = generateNumbers()
  setInterval(() => numbers.value = generateNumbers(), 1000)
})

</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 385px;
}

.container > * {
  position: absolute;
  width: 75%;
  height: 100%;
  transition: 'all .1s ease-out';
}

.numbers {
  overflow-wrap: break-word;
  overflow: hidden;
  font-family: monospace !important;
  text-shadow: 0px 0px 10px #69F0AE;
}
.code {

}
.image {

}
</style>