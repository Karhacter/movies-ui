import './assets/css/index.css'
import router from './router/index'
import { createApp } from 'vue'
import App from './App.vue'
import DefaultLayout from './views/DefaultLayout.vue'
import ErrorLayout from './layouts/ErrorLayout.vue'
import { $http } from './plugins/http-wrapper'

// Check for existing auth token on app startup
const token = localStorage.getItem('authToken')
if (token) {
  $http.setAccessToken(token)
}

const app = createApp(App)

app.component('DefaultLayout', DefaultLayout)
app.component('ErrorLayout', ErrorLayout)
app.config.globalProperties.$http = $http
app.use(router)
app.mount('#app')
