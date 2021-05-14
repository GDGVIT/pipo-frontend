<template>
  <div class="post bg-myRed text-white font-glight p-9 relative rounded-md">
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="text-xl font-gbold">@ {{ latestPost?.username }}</span>
        <span
          class="bg-white text-myRed font-semibold ml-2 text-xs rounded-full px-2"
          >{{ latestPost?.points }}</span
        >
      </div>
    </div>
    <div class="">
      <div class="text-2xl font-gbold tracking-wide my-8">
        {{ latestPost?.title }}
      </div>
      <div class="tracking-wider">
        {{ latestPost?.description }}
      </div>
      <div class="flex flex-col justify-items-center mt-5">
        <div v-for="(img, index) in latestPost?.image" :key="index">
          <img :src="img" alt="post-image" />
        </div>
      </div>
      <div class="flex mt-4">
        <div
          class="border-2 border-white px-3 py-1 rounded-md text-sm mr-3"
          v-for="(tag, index) in latestPost?.tags"
          :key="index"
        >
          {{ tag }}
        </div>
      </div>
    </div>

    <div class="absolute -top-5 font-gbold left-0 text-white text-sm">
      Your Latest Post ✨
    </div>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { getLatestPost } from "../../composables/posts";
import { setUser } from "../../composables/auth";
export default {
  setup() {
    const { updateLatestPost, latestPost } = getLatestPost();
    const { isLoggedIn } = setUser();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await updateLatestPost();
      }
    });

    return { latestPost };
  },
};
</script>

<style></style>
