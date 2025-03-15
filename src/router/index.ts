import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.ts'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
