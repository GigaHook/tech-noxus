<template>
  <v-container
    class="container"
    :style="{
      width: display.lgAndDown.value ? '75%' : '50%',
    }"
  >
    <v-sheet
      v-if="!display.mobile.value"
      color="black"
      class="blank ps-1 rounded-xl text-green-accent-2 text-h5"
    >

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
import { parallax } from '@/composables/useAnimations'

const display = useDisplay()
const code = ref()
const image = ref()
const { isScrolling } = useScroll(window)

function animate(elem, value) {
  function cap(x, max) {
    if (x > max + x) return max + x
    if (x < -max + x) return -max + x
    return x
  }

  const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(elem)

  watch ([elementX, elementY], () => !isScrolling.value && gsap.to(elem.value.$el, {
      x: cap((elementX.value - elementWidth.value / 2) / value, 60 - value),
      y: cap((elementY.value - elementHeight.value / 2) / value, 60 - value),
    })
  ) 
}

onMounted(() => {
  if (!display.mobile.value) {
    parallax(code, -20)
    parallax(image, 20)
  }
})

</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.container > * {
  position: absolute;
  width: 75%;
  height: 385px;
  transition: 'all .1s ease-out';
}

.blank {
  overflow-wrap: break-word;
  overflow: hidden;
  font-family: monospace !important;
  text-shadow: 0px 0px 10px #69F0AE;
}
.code {
  bottom: 80px;
  left: 80px;
}
.image {
  top: 50px;
  right: 50px;
}
</style>