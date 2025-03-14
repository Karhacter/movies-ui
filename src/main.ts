import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import DefaultLayout from '../src/views/DefaultLayout.vue'
import App from './App.vue'

const app = createApp(App)

app.component('DefaultLayout', DefaultLayout)

app.use(router)
app.mount('#app')
