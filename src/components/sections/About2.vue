<template>
  <v-container
    class="container mt-16 pb-16"
    :style="{
      width
    }"
  >
    <v-sheet
      v-if="!display.mobile.value"
      color="black"
      class="blank ps-1 rounded-xl text-green-accent-2 text-h5"
    >
      {{ numbers }}
    </v-sheet>

    <v-sheet 
      v-if="!display.mobile.value"
      class="code rounded-xl overflow-hidden"
      elevation="12"
      ref="code"
    >
      <v-img src="@/assets/images/code3.jpg" cover eager/>
    </v-sheet>

    <v-sheet
      color="grey-lighten-3"
      class="image rounded-xl"
      ref="image"
      elevation="12"
    >
      <v-container>
        <v-row>
          <v-col cols="6" class="text-h6 ps-6">
            <div class="text-h4 my-2">
              С нуля до первых проектов
            </div>
            Неважно, есть ли у вас опыт в программировании и дизайне или вы только делаете первые шаги в IT.
            Мы научим вас всем навыкам, необходимым для работы над реальными проектами.
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
import { ref, onMounted, watch } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useMouseInElement, useScroll } from '@vueuse/core'
import { gsap } from 'gsap/all'

const display = useDisplay()
const numbers = ref()
const code = ref()
const image = ref()
const { isScrolling } = useScroll(window)

const width = display.lgAndDown.value ? 'width: 75%' : 'width: 50%'

//нахуй матрицу, numbers -> blank
//function generateNumbers() {
//  let result = ''
//  let value = 121
//
//  while (value--) {
//    result += Math.round(Math.random())
//  }
//
//  return result.repeat(display.mdAndDown.value ? 6 : 16)
//}

function animate(elem, c) {
  function cap(value, max) {
    value > max + c && (value = max + c)
    value < -max - c && (value = -max - c)
    return value
  }

  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(elem)

  watch ([elementX, elementY], () => !isScrolling.value && gsap.to(elem.value.$el, {
      x: cap((elementX.value - elementWidth.value / 2) / c, 60 - c),
      y: cap((elementY.value - elementHeight.value / 2) / c, 60 - c),
    })
  ) 
}

onMounted(() => {
  if (!display.mobile.value) {
    animate(code, 20)
    animate(image, 10)
  }
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

.blank {
  overflow-wrap: break-word;
  overflow: hidden;
  font-family: monospace !important;
  text-shadow: 0px 0px 10px #69F0AE;
}
.code {
  top: 10%;
  right: 8%;
}
.image {
  bottom: 10%;
  right: 4%;
}
</style>