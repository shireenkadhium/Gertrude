import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/store'
import Layout from '@/layouts/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      meta: {
        isPublic: true
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Login.vue')
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/chat',
          name: 'chat',
          meta: {},
          component: () => import('../views/Chat.vue'),
          children: []
        },
        {
          path: '/admin',
          name: 'admin',
          meta: {
            isAdminRoute: true
          },
          component: () => import('../views/AdminPanel.vue'),
          children: []
        },
        {
          path: '*',
          redirect: { name: 'chat' }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const { isPublic, admin } = to.meta
  const { acessToken, isAuthenticated } = authStore

  console.log(acessToken, isAuthenticated)

  if (!isPublic && !isAuthenticated) {
    console.log('redirecting to login')
    return { name: 'login' }
  }
})

export default router
