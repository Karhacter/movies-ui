export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/homepages/index.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: () => import('../views/static-page/ErrorPage.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/components/Contact.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/movies',
    name: 'movies',
    component: () => import('../components/Movies.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/tokens-purchase',
    name: 'tokens',
    component: () => import('@/components/TokensPurchase.vue'),
    meta: { layout: 'Default' },
  },
]
