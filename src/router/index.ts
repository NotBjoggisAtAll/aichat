import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/thread/:threadId',
      name: 'thread',
      component: () => import('../views/ThreadView.vue')
    }
  ]
})

export default router
