import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/store/auth.store'
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
          path: '/chats',
          name: 'chats',
          meta: {},
          component: () => import('../views/Chats.vue'),
          children: []
        },
        {
          path: '/chat/:id?',
          name: 'chat',
          meta: {},
          component: () => import('../views/Chat.vue'),
          props: (route) => ({
            id: route.params.id
          }),
          children: []
        },
        {
          path: '/chats',
          name: 'chats',
          meta: {
            isAdminRoute: true
          },
          component: () => import('../views/ManageChats.vue'),
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
          path: '/chat/',
          redirect: { name: 'chat' }
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
