import vuetify from './vuetify'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'
import VueTheMask from 'vue-the-mask'
import router from './router'

export function registerPlugins (app) {
  app.use(vuetify)
    .use(VueTheMask)
    .use(router)

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
