import { createWebHistory, createRouter } from "vue-router"
import { useAuth } from "@/scripts/api"
import Home from '@/pages/Home.vue' 
import Partners from '@/pages/Partners.vue'
import Auth from '@/pages/Auth.vue'
import PostsCreate from '@/pages/posts/Create.vue'
import PostsIndex from '@/pages/posts/Index.vue'

const { user } = useAuth()

function adminGuard(to) {
  return !user?.value ? { name: 'Home' } : true
}

function guestGuard(to) {
  return user?.value ? { name: 'Home' } : true
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
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
    {
      path: '/posts/:id',
      name: 'PostsUpdate',
      component: PostsCreate,
      beforeEnter: adminGuard,
    },
  ],
})

export default router