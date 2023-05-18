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
          path: '/documents',
          name: 'documents',
          meta: {
            isAdminRoute: true
          },
          component: () => import('../views/UploadDocuments.vue'),
          children: []
        },
        {
          path: '/users',
          name: 'users',
          meta: {
            isAdminRoute: true
          },
          component: () => import('../views/Users.vue'),
          children: []
        },
        {
          path: '/settings',
          name: 'settings',
          meta: {
            isAdminRoute: true
          },
          component: () => import('../views/Settings.vue'),
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
  const { isAuthenticated } = authStore

  if (isPublic && isAuthenticated) {
    return { name: 'chat' }
  }

  if (!isPublic && !isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
