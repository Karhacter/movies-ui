import './assets/css/index.css'
import './assets/js/adminlte.js'
import 'jquery'

import './assets/js/dashboard3.js'
import router from './router/index'
import { createApp } from 'vue'
import App from './App.vue'
import ErrorLayout from './layouts/ErrorLayout.vue'
import { $http } from './plugins/http-wrapper'
import UserLayout from './layouts/UserLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

// Check for existing auth token on app startup

const token = localStorage.getItem('token')

if (token) {
  $http.setAccessToken(token)
}

const app = createApp(App)

app.component('AdminLayout', AdminLayout)
app.component('UserLayout', UserLayout)
app.component('ErrorLayout', ErrorLayout)
app.config.globalProperties.$http = $http
app.use(router)
app.mount('#app')
