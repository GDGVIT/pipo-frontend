<template>
  <div v-if="!latestPost">
    <LoadingMyLatestPost :masonry="masonry" />
  </div>
  <div
    v-else
    class="post bg-myRed text-white font-glight p-9 relative sm:rounded-md"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="text-xl font-gbold">@ {{ profile?.user?.userName }}</span>
        <span
          class="bg-white text-myRed font-semibold ml-2 text-xs rounded-full px-2"
          >{{ profile?.user?.points }}</span
        >
      </div>
    </div>
    <div>
      <div class="text-2xl font-gbold tracking-wide my-8">
        {{ latestPost?.title }}
      </div>
      <div class="tracking-wider">
        {{ latestPost?.description }}
      </div>
      <div class="flex flex-col justify-items-center mt-5">
        <div
          v-for="(img, index) in latestPost?.image"
          :key="index"
          class="grid place-items-center"
        >
          <img :src="img" alt="post-image" @load="resizeGridItem(masonry)" />
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
import { getLatestPost, resizing } from "../../composables/posts";
import { setUser } from "../../composables/auth";
import { getProfile } from "../../composables/profile";
import LoadingMyLatestPost from "@/components/loadComponents/LoadingMyLatestPost";

export default {
  components: { LoadingMyLatestPost },
  props: ["masonry"],
  setup() {
    const { loadProfile, profile } = getProfile();
    const { updateLatestPost, latestPost } = getLatestPost();
    const { isLoggedIn } = setUser();
    const { resizeGridItem } = resizing();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadProfile();
        await updateLatestPost();
      }
    });

    return { latestPost, profile, resizeGridItem };
  },
};
</script>

<style></style>
