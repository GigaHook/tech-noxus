import { createWebHistory, createRouter } from "vue-router"
import { useStorage } from '@vueuse/core'
import { defineAsyncComponent } from "vue"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'
import Auth from '@/pages/Auth.vue'
import PostsCreate from '@/pages/posts/Create.vue'

const user = useStorage('user')

function adminGuard(to) {
  return !user?.value ? { name: 'Home' } : true
}

function guestGuard(to) {
  return user.value ? { name: 'Home' } : true
}

const router = createRouter({
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
      meta: {
        keepAlive: true,
      }
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
      component: () => import('@/pages/posts/Index.vue'),
    },
    {
      path: '/posts/create',
      name: 'PostsCreate',
      component: PostsCreate,
      beforeEnter: adminGuard,
    },
    {
      path: '/posts/:id/edit',
      name: 'PostsUpdate',
      component: PostsCreate,
      beforeEnter: adminGuard,
    },
  ],
})

export default router