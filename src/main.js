import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import routes from './router'
import store from './store'

const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')