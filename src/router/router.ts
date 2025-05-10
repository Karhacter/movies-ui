export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/site/Login.vue'),
    meta: { public: true, layout: 'User' },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/site/Signup.vue'),
    meta: { layout: 'User', public: true },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/site/Homepage.vue'),
    meta: { layout: 'User' },
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
    component: () => import('../views/site/Contact.vue'),
    meta: { layout: 'User' },
  },

  // API Movie
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/site/movies/Movies.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/movies?page=:page',
    name: 'movies-page',
    component: () => import('../views/site/movies/Movies.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/movie/:slug',
    name: 'movieDetail',
    component: () => import('../views/site/movies/MovieDetail.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/movies/category/:link',
    name: 'movie-category',
    component: () => import('../views/site/movies/MovieByCategory.vue'),
    meta: { layout: 'User' },
  },
  //
  {
    path: '/tokens-purchase',
    name: 'tokens',
    component: () => import('../views/site/cart/TokensPurchase.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/tokens-purchase/checkout',
    name: 'Checkout',
    component: () => import('../views/site/cart/Checkout.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/movie/play/:slug/ep-:id',
    name: 'movie-play',
    component: () => import('../views/site/movies/MoviePlay.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/site/Login.vue'),
    meta: { layout: 'User', public: true },
  },
  {
    path: '/account/change-password',
    name: 'changepassword',
    component: () => import('../views/site/account/ChangePassword.vue'),
    meta: { layout: 'User', public: true },
  },
  {
    path: '/reset-password',
    name: 'resetpassword',
    component: () => import('../views/site/account/ResetPassword.vue'),
    meta: { layout: 'User', public: true },
  },
  // Profile
  {
    path: '/account/info',
    name: 'UserProfile',
    component: () => import('../views/site/account/Profile.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/tu-phim',
    name: 'UserWatchList',
    component: () => import('../views/site/account/WatchList.vue'),
    meta: { layout: 'User' },
  },
  {
    path: '/lich-su-xem',
    name: 'UserHistory',
    component: () => import('../views/site/account/History.vue'),
    meta: { layout: 'User' },
  },
  // admin layout
  {
    path: '/admin',
    meta: { layout: 'Admin', requiresAuth: true, requiredRole: 'SUPER_ADMIN' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: { layout: 'Admin' },
      },
      // Place For Movie
      {
        path: 'movies',
        name: 'AdminListMovie',
        component: () => import('../views/admin/movies/index.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'movies/create',
        name: 'CreateMovie',
        component: () => import('../views/admin/movies/create.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'movie/edit/:id',
        name: 'EditMovie',
        component: () => import('../views/admin/movies/edit.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'movies/trash',
        name: 'TrashMovie',
        component: () => import('../views/admin/movies/delete.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'movie/detail/:id',
        name: 'AdminMovieDetail',
        component: () => import('../views/admin/movies/detail.vue'),
        meta: { layout: 'Admin' },
      },
      // End Movie
      {
        path: 'calendar',
        name: 'CalendarAdmin',
        component: () => import('../views/admin/Calendar.vue'),
        meta: { layout: 'Admin' },
      },
      // Place for User
      {
        path: 'user',
        name: 'UserList',
        component: () => import('../views/admin/user/index.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'user/create',
        name: 'UserCreate',
        component: () => import('../views/admin/user/create.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'user/trash',
        name: 'DeletedUser',
        component: () => import('../views/admin/user/delete.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'user/detail/:id',
        name: 'DetailUser',
        component: () => import('../views/admin/user/detail.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'user/edit/:id',
        name: 'UpdateUser',
        component: () => import('../views/admin/user/edit.vue'),
        meta: { layout: 'Admin' },
      },
      // End FOr User
      // Place for comments
      {
        path: 'comment',
        name: 'CommentIndex',
        component: () => import('../views/admin/comment/index.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'comment/list',
        name: 'CommentList',
        component: () => import('../views/admin/comment/list.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'comment/detail',
        name: 'DetailComent',
        component: () => import('../views/admin/comment/detail.vue'),
        meta: { layout: 'Admin' },
      },
      // End For Comments
      {
        path: 'payment',
        name: 'PaymentList',
        component: () => import('../views/admin/order/index.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'payment/edit/:id',
        name: 'PaymentEdit',
        component: () => import('../views/admin/order/edit.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'episode',
        name: 'EpisodeList',
        component: () => import('../views/admin/episode/index.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'episode/movie/:id',
        name: 'EpisodeDetail',
        component: () => import('../views/admin/episode/detail.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'episode/movie/edit/:id',
        name: 'EpisodeEdit',
        component: () => import('../views/admin/episode/edit.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'episode/movie/create',
        name: 'EpisodeCreate',
        component: () => import('../views/admin/episode/create.vue'),
        meta: { layout: 'Admin' },
      },
      {
        path: 'search',
        name: 'AdminSearch',
        component: () => import('../views/admin/AdminSearch.vue'),
        meta: { layout: 'Admin' },
      },
    ],
  },
  {
    path: '/login-success',
    name: 'LoginSuccess',
    component: () => import('../components/Login/LoginSuccess.vue'),
    meta: { layout: 'User', public: true },
  },
]
