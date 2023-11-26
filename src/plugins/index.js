import vuetify from './vuetify'
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all'

export function registerPlugins (app) {
  app.use(vuetify)
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
}
