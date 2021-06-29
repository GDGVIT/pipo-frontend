<template>
  <div v-if="!latestPost" data-aos="fade-up">
    <LoadingCard :masonry="masonry" isLatestPost="true" />
  </div>
  <div
    v-else
    data-aos="fade-up"
    class="post bg-myRed text-white font-glight p-9 pb-6 relative sm:rounded-md"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="text-xl font-gbold">@ {{ profile?.user?.userName }}</span>
        <span
          class="bg-white text-myRed font-semibold ml-2 py-1 text-xs rounded-full px-2"
          >{{ profile?.user?.points }} pts</span
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
import { onUpdated, watchEffect } from "vue";
import { getLatestPost, resizing } from "../../composables/posts";
import { setUser } from "../../composables/auth";
import { getProfile } from "../../composables/profile";
import LoadingCard from "@/components/loadComponents/LoadingCard";

export default {
  components: { LoadingCard },
  props: ["masonry"],
  setup(props) {
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

    onUpdated(() => resizeGridItem(props.masonry));

    return { latestPost, profile, resizeGridItem };
  },
};
</script>

<style></style>
