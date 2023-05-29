import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
