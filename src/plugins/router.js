import { createWebHistory, createRouter } from "vue-router"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'
import Auth from '@/pages/Auth.vue'
import PostsIndex from '@/pages/posts/Index.vue'
import PostsCreate from '@/pages/posts/Create.vue'

import useStore from '@/composables/useStore'
const store = useStore()

function adminGuard(to) {
  return !store.user ? { name: 'Home' } : true
}

function guestGuard(to) {
  return store.user ? { name: 'Home' } : true
}

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
      component: Auth,
      beforeEnter: guestGuard,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: PostsIndex,
    },
    {
      path: '/posts/create',
      name: 'PostsCreate',
      component: PostsCreate,
      beforeEnter: adminGuard,
    },
    //{
    //  path: '/posts/update',
    //  name: 'PostsUpdate',
    //  component: {}, //TODO
    //  beforeEnter: adminGuard,
    //},
  ],
})