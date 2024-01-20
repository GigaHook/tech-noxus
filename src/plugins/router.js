import { createWebHistory, createRouter } from "vue-router"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'
import Auth from '@/pages/Auth.vue'

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
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ],
})