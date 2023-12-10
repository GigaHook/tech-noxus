import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import Title from './components/Title.vue'
import RenderOnScroll from './components/RenderOnScroll.vue'
import CourseTypeChip from './components/CourseTypeChip.vue'

const app = createApp(App)

app.component('Title', Title)
  .component('RenderOnScroll', RenderOnScroll)
  .component('CourseTypeChip', CourseTypeChip)

registerPlugins(app)

app.mount('#app')
