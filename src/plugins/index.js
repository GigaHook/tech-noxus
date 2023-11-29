import vuetify from './vuetify'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'
import VueTheMask from 'vue-the-mask'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(VueTheMask)
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
