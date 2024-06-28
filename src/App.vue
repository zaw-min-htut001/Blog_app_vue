<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import store from './store'
import { onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      const userString = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (userString) {
        const userData = JSON.parse(userString)
        store.commit('SET_USER', userData)
        store.commit('SET_TOKEN' , token)
      }
      // re login when refresh page
      axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
    
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
    
            return config;
        },
    
        (error) => {
            return Promise.reject(error);
        }
    );
    });
  },
}
</script>

<style></style>