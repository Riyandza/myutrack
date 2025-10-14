import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // Import router
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // Use Pinia
app.use(router) // Use Vue Router
app.mount('#app')