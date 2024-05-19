import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import VueTheMask from 'vue-the-mask'
import VueScrollTo from 'vue-scrollto'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'

export function registerPlugins(app) {
  app.use(vuetify)
     .use(router)
     .use(VueTheMask)
     .use(VueScrollTo)

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
