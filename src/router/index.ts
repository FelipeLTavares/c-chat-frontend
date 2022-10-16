import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Auth',
    component: ()=> import('../views/AuthenticationView.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ()=> import('../views/ChatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( (to, from) => {
  if(!store.state.userInfo.isLoggedIn && to.name !== 'Auth'){
    return {
      name: 'Auth'
    }
  }
} )

export default router
