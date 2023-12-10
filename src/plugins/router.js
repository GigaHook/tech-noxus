import { createWebHistory, createRouter } from "vue-router"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/partners',
      name: 'Partners',
      component: Partners,
    },
  ],
})