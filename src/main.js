import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import Title from './components/Title.vue'
import CourseTypeChip from './components/CourseTypeChip.vue'
import { animateOnScroll } from './directives/animateOnScroll'


const app = createApp(App)

app.component('Title', Title)
  .component('CourseTypeChip', CourseTypeChip)
  .directive('animateOnScroll', animateOnScroll)

registerPlugins(app)

app.mount('#app')
