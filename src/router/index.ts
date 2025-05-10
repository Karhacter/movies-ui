import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import { $http } from '../plugins/http-wrapper'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

interface RouteMeta {
  public?: boolean
  requiresAuth?: boolean
  requiredRole?: string
  isLoggedIn?: boolean
}

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const meta = to.meta as RouteMeta
    try {
      // First verify auth status and get user info
      const user = (await $http.get('/auth/check')) as { roles?: string[] }
      meta.isLoggedIn = true

      // Redirect away from auth pages if already logged in
      if (meta.public && (to.path === '/login' || to.path === '/signup' || to.path === '/')) {
        return next('/home')
      }

      // Check if route requires auth
      if (meta.requiresAuth) {
        // Check user role if required
        const roles = user.roles || []
        if (meta.requiredRole && !roles.includes(meta.requiredRole)) {
          // Redirect unauthorized users to login or error page
          return next('/login')
        }
      }

      next()
    } catch (error) {
      meta.isLoggedIn = false
      if (meta.requiresAuth) {
        return next('/login')
      }
      next()
    }
  }
)

export default router
