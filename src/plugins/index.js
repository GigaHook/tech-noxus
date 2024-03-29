import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import VueTheMask from 'vue-the-mask'
import VueScrollTo from 'vue-scrollto'
import YMaps from '@/plugins/yandexMaps'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'

export function registerPlugins(app) {
  app.use(vuetify)
     .use(router)
     .use(VueTheMask)
     .use(VueScrollTo)
     .use(YMaps)

  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
