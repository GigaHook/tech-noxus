<template>
  <v-container class="px-8">
    <v-row>
      <v-col cols="12" class="text-h5">
        Все курсы
      </v-col>

      <CourseCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :text="card.text"
        class="card"
      />
    </v-row>
  </v-container>  
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted } from 'vue'

const cards = [
  {
    title: 'asd',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente commodi exercitationem quibusdam et ut pariatur a. Illo aliquid nulla similique reprehenderit quae fugit, necessitatibus quis culpa nihil id ratione expedita!',
  },
  {
    title: 'zxc',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facere rerum enim ullam. Eligendi reiciendis molestias possimus magni neque. Repellat consequatur officia eius, velit dolorum provident laborum rem cupiditate commodi!',
  },
  {
    title: 'qwe',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem totam at reiciendis voluptatum praesentium voluptatibus dolor amet perspiciatis nisi exercitationem! Error harum totam quidem sapiente iure nihil autem nam ipsa!',
  }
]

onMounted(() => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.card',
      start: 'top bottom',
      end: '+=100',
      scrub: 2,
    }
  })
  .set('.card', {
    opacity: 0,
    x: -50,
  })
  .to('.card', {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.1,
  })
})
</script>