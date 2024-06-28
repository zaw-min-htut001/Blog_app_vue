import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import routes from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'bg-gray-900 text-white px-3 py-2',
  })

router.beforeEach((to, from, next) => {
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

// Check if the route requires authentication
if (to.matched.some(record => record.meta.auth)) {
  // If neither token nor user exists, redirect to login
  if (!token) {
    return next('/login');
  } else {
    return next()
  }
}
// If authentication is not required or either token or user exists, proceed
next();

})
  
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

