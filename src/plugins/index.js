import vuetify from './vuetify'
import router from './router'
import VueTheMask from 'vue-the-mask'
import VueScrollTo from 'vue-scrollto'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'

export function registerPlugins (app) {
  app.use(vuetify)
    .use(VueTheMask)
    .use(VueScrollTo)
    .use(router)

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
