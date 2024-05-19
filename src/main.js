import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import animateOnScroll from './directives/animateOnScroll'

const app = createApp(App)

app.directive('animateOnScroll', animateOnScroll)

registerPlugins(app)

app.mount('#app')
