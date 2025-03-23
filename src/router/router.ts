export default [
  {
    path: '/',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Homepage.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: () => import('../views/static-page/ErrorPage.vue'),
    meta: { layout: 'Error' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/Movies.vue'),
    meta: { layout: 'Default' },
  },

  {
    path: '/tokens-purchase',
    name: 'tokens',
    component: () => import('../views/TokensPurchase.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'Default' },
  },
]
