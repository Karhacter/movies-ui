import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.ts'
import { $http } from '../plugins/http-wrapper'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  try {
    // First verify auth status
    await $http.get('/auth/check')
    to.meta.isLoggedIn = true

    // Redirect away from auth pages if already logged in
    if (to.meta.public && (to.path === '/login' || to.path === '/signup' || to.path === '/')) {
      return next('/home')
    }
    next()
  } catch (error) {
    to.meta.isLoggedIn = false
    if (to.meta.requiresAuth) {
      return next('/login')
    }
    next()
  }
})

export default router
