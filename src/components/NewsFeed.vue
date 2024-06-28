<template>
  <br/>

<form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input v-model="searchKey" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search... " />
        <button @click.prevent="search" type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

  <div  class=" my-5 flex gap-5 justify-center">
    <button @click="handleCategory('')" 
    class="px-2 py-1.5 text-sm font-semibold text-gray-600  bg-white border border-blue-600 rounded-lg"
    >All</button>
    <button @click="handleCategory(category.name)" v-for="category in getCategories" :key="category.id" 
    class="px-2 py-1.5 text-sm font-semibold text-gray-600  bg-white border border-blue-600 rounded-lg"
    >{{ category.name }}</button
  >
  </div>
<section class="grid  p-8 place-items-center">

<div v-if="loading" role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>

  <div class="container grid grid-cols-1 gap-8 my-auto lg:grid-cols-2">
    <div v-for="post in getAllposts" :key="post.id" class="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2">
      <div class="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0"><img :src="post.image_path" class="object-cover w-full h-full" />
      </div>
      <div class="p-6 px-2 sm:pr-6 sm:pl-4">
        <p class="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 !font-semibold">{{ post.category_name }}</p>
        <router-link :to="{ name : 'postDetails', params : { postId : post.id }}" class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">{{ post.title }}</router-link>
        <p class="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">{{ post.description }}</p>
        <div class="flex items-center gap-4">
          <div>
            <p class="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 !font-semibold">{{ post.owner_name}}</p>
            <p class="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">{{ post.created_at}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex/dist/vuex.cjs.js';
export default {
name : 'NewsFeed',
data (){
  return {
    searchKey : '' ,
    loading : true
  }
},
computed : {
  ...mapGetters( ['getCategories','getAllposts']),
},
methods :{
  ...mapActions(['fetchCategory','fetchAllPost','filterByCate' ,'searchPosts']),
  handleCategory(name){
    this.filterByCate(name)
  },
  search(){
    this.searchPosts(this.searchKey)
  }
},
mounted (){
  this.fetchCategory();
  setTimeout(() => {
    this.fetchAllPost()
    this.loading =false
  }, "1000");
}
}
</script>

<style>

</style>