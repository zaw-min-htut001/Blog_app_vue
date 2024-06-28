<template>
  <Navbar />
  <NewsFeed />
</template>

<script>
import { mapActions, mapGetters } from 'vuex/dist/vuex.cjs.js';
import Navbar from '@/components/Navbar.vue'
import NewsFeed from '@/components/NewsFeed.vue'

export default {
  name: 'HomeView',
  components: { Navbar, NewsFeed},
  computed: {
    ...mapGetters([''])
  },
  methods: {
    ...mapActions(['profile']),

  },
  mounted() {
    this.profile()
  }
}
</script>

<style></style>