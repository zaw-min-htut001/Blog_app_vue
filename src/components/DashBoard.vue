<template>
    <Navbar />

    <div class="flex flex-row gap-4 my-10">
        <div class="basis-1/2 overflow-auto h-[80vh]">
            <div v-for="post in getProfilePosts" :key="post.id"
                class="shadow-2xl mt-6 mx-[150px] max-w-sm bg-white border border-gray-200 rounded-lg mb-[30px] dark:bg-white dark:border-blue-200">
                <img class="object-cover h-48 w-96 rounded-t-lg" :src="post?.image_path" alt="" />
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                            {{ post?.title }}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-600">
                        {{ post?.description }}
                    </p>
                    <div class="flex flex-row justify-between items-center">
                        <router-link :to="{ name: 'postDetails', params: { postId: post?.id } }"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </router-link>
                        <button @click="deletePost(post?.id)">
                            <svg  class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="basis-1/2">
            <form @submit.prevent="handleForm()" class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Title</label>
                    <input v-model="data.title" type="text" id="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" />
                    <span class="text-red-600 text-sm" v-if="this.errors?.title">*{{ this.errors.title[0] }}</span>
                </div>
                <div class="mb-5">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your
                        Description</label>
                    <textarea v-model="data.description" id="message" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."></textarea>
                    <span class="text-red-600 text-sm" v-if="this.errors?.description">*{{ this.errors.description[0]
                        }}</span>
                </div>
                <div class="mb-5">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category
                        Name</label>
                    <select v-model="data.category_id"
                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="" selected disabled>Choose category</option>
                        <option v-for="category in getCategories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                    <span class="text-red-600 text-sm" v-if="this.errors?.category_id">*{{ this.errors.category_id[0]
                        }}</span>
                </div>
                <div class="mb-5">
                    <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Photo</label>
                    <input @change="upload" type="file" id="file" accept="image/*" multiple
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <span class="text-red-600 text-sm" v-if="this.errors?.file_name">*{{ this.errors.file_name[0]
                        }}</span>
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex/dist/vuex.cjs.js";
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
    name: "Dashboard",
    components: {
        Navbar,
    },
    data() {
        return {
            data: {
                'title': '',
                'description': '',
                'category_id': '',
                'file_name': '',
                'user_id': ''
            },
            errors: {}
        }
    },
    computed: {
        ...mapGetters(["getProfilePosts", "getCategories", "userProfile"]),
    },
    methods: {
        ...mapActions(["fetchProfilePosts", "fetchCategory", "profile"]),
        upload(e) {
            this.data.file_name = e.target.files[0];
        },
        async handleForm() {
            try {
                this.data.user_id = this.userProfile.id
                await axios.post('/post', this.data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                location.reload()
            } catch (e) {
                this.errors = e.response.data.errors
            }
        },
        async deletePost(id){
            await axios.delete(`/post/${id}/delete`);
            location.reload()
        }
    },
    mounted() {
        this.fetchProfilePosts();
        this.fetchCategory()
        this.profile()
    },
};
</script>

<style></style>