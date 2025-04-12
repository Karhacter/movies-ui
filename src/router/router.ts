export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { public: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
    meta: { layout: 'Default', public: true },
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
    component: () => import('../views/ErrorPage.vue'),
    meta: { layout: 'Error' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { layout: 'Default' },
  },

  // API Movie
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/movies/Movies.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/movies?page=:page',
    name: 'movies-page',
    component: () => import('../views/movies/Movies.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/movie/:id',
    name: 'movie-detail',
    component: () => import('../views/movies/MovieDetail.vue'),
    meta: { layout: 'Default' },
  },
  {
    path: '/movies/category/:link',
    name: 'movie-category',
    component: () => import('../views/movies/MovieByCategory.vue'),
    meta: { layout: 'Default' },
  },
  //
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
    meta: { layout: 'Default', public: true },
  },
]
