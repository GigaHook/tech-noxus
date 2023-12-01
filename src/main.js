import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import Title from './components/Title.vue'
import CourseCard from './components/CourseCard.vue'
import AboutRow from './components/AboutRow.vue'
import HeroSvg from './components/svg/HeroSvg.vue'
import LayoutSvg from './components/svg/LayoutSvg.vue'
import VideoSvg from './components/svg/VideoSvg.vue'
import ModelingSvg from './components/svg/ModelingSvg.vue'
import FirstProjectSvg from './components/svg/FirstProjectSvg.vue'
import TimetableSvg from './components/svg/TimetableSvg.vue'
import MapSvg from './components/svg/MapSvg.vue'
import RenderOnScroll from './components/RenderOnScroll.vue'
import CourseTypeChip from './components/CourseTypeChip.vue'

const app = createApp(App)

app.component('Title', Title)
app.component('HeroSvg', HeroSvg)
app.component('CourseCard', CourseCard)
app.component('AboutRow', AboutRow)
app.component('LayoutSvg', LayoutSvg)
app.component('ModelingSvg', ModelingSvg)
app.component('VideoSvg', VideoSvg)
app.component('FirstProjectSvg', FirstProjectSvg)
app.component('TimetableSvg', TimetableSvg)
app.component('MapSvg', MapSvg)
app.component('RenderOnScroll', RenderOnScroll)
app.component('CourseTypeChip', CourseTypeChip)

registerPlugins(app)

app.mount('#app')
