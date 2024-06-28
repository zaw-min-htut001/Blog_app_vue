<template>
  <div
    class="flex min-h-full item-center flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="formSubmit()">
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
            v-model="FormData.name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span class="text-red-600 text-sm" v-if="this.errors?.name">*{{ this.errors.name[0] }}</span>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
            v-model="FormData.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span class="text-red-600 text-sm" v-if="this.errors?.email">*{{ this.errors.email[0] }}</span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
            v-model="FormData.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span class="text-red-600 text-sm" v-if="this.errors?.password">*{{ this.errors.password[0] }}</span>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions , mapGetters } from 'vuex/dist/vuex.cjs.js';

export default {
  data () {
    return {
      FormData : {
        'name' : '' ,
        'email' : '' ,
        'password' : ''
      },
    }
  },
  computed :{
    ...mapGetters(['errors'])
  },
  methods:{
    ...mapActions(['register']),
    formSubmit (){
        this.register(this.FormData).then((res) => {
          console.log(res);
        this.$router.replace('/home')
      });
    }
  }
};
</script>

<style></style>
