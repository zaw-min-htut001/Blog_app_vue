<template>
  <Navbar />
  <div
    class="relative isolate overflow-hidden bg-white px-6 sm:py-32 lg:overflow-visible lg:px-0"
  >
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        />
      </svg>
    </div>
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
    >
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
      >
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            <p class="text-base font-semibold leading-7 text-indigo-600">
              {{ detailsPost?.category_name }}
            </p>
            <h1
              class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {{ detailsPost?.title }}
            </h1>
            <blockquote
              class="text-xl italic font-semibold text-gray-900 dark:text-white"
            >
              <p class="mt-6 text-xl leading-8 text-gray-700">
                {{ detailsPost?.description }}
              </p>
            </blockquote>
            <div
              class="flex mt-4 items-center text-blue-900 dark:text-blue-900 space-x-3.5 rtl:space-x-reverse"
            >
              <span>
                <h3 class="flex gap-2 font-medium leading-tight">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-blue-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  {{ detailsPost?.owner_name }}
                </h3>
                <p class="text-sm flex mt-2 gap-2">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-blue-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {{ detailsPost?.created_at }}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
      >
        <img
          class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          alt=""
          :src="detailsPost?.image_path"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      detailsPost: null,
    };
  },
  methods: {
    async fetchDetailsPost() {
      const id = this.$route.params.postId;
      let res = await axios.get(`post/${id}/detail`);
      this.detailsPost = res.data.data;
    },
  },
  mounted() {
    this.fetchDetailsPost();
  },
};
</script>

<style></style>
