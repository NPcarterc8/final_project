import { refSession } from '@/models/session'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const session = refSession()
  if (!['/login', '/Signup'].includes(to.path) && !session.user) {
    next('/login')
  } else {
    next()
  }
})
export default router
