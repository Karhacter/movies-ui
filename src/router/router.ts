export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/homepage/index.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../components/About.vue'),
    meta: { layout: 'Default' },
  },
]
