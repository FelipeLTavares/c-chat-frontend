import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AuthenticationView',
    component: () => import('../views/AuthenticationView.vue')
  },
  {
    path: '/chat',
    name: 'ChatView',
    component: ()=> import('../views/ChatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
