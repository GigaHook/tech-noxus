import { createWebHistory, createRouter } from "vue-router"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'
import Auth from '@/pages/Auth.vue'
import PostsCreate from '@/pages/posts/Create.vue'
import useStore from '@/composables/useStore'
const store = useStore()

const adminGuard = () => !!store.user

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
    },
    {
      path: '/posts',
      name: 'Posts',
      component: {} //TODO
    },
    {
      path: '/posts/create',
      name: 'PostsCreate',
      component: PostsCreate, //TODO
      beforeEnter: adminGuard,
    },
    {
      path: '/posts/update',
      name: 'PostsUpdate',
      component: {}, //TODO
      beforeEnter: adminGuard,
    },
  ],
})