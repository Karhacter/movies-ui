import { NavigationGuard } from 'vue-router'

export const authGuard: NavigationGuard = (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Or your auth check logic

  // If route requires auth and user isn't authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Store the attempted URL for redirecting
    localStorage.setItem('redirectPath', to.fullPath)
    next({ name: 'login' })
    return
  }

  // If user is authenticated and tries to access login/signup
  if (isAuthenticated && to.meta.isGuestOnly) {
    next({ name: 'home' })
    return
  }

  next()
}
