import vuetify from './vuetify'
import { gsap, ScrollTrigger } from 'gsap/all'

export function registerPlugins (app) {
  app.use(vuetify)
  gsap.registerPlugin(ScrollTrigger)
}
