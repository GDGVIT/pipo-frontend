<template>
  <div class="font-glight mt-16 text-white">
    <!-- Top details of the user -->
    <div class="p-8 grid md:grid-cols-4">
      <!-- Profile pic -->
      <div class="grid place-items-center">
        <div v-if="randomUser?.user?.picture">
          <img
            class="w-40 h-40 rounded-full"
            :src="randomUser?.user?.picture"
            alt="profile-pic"
          />
        </div>
        <div v-else>
          <Icon name="profileIcon" />
        </div>
      </div>
      <!-- Content -->
      <div class="pt-3 pb-8 text-center md:text-left md:col-span-3">
        <div class="font-gbold text-5xl py-5">
          {{ randomUser?.user?.userName }}
        </div>
        <div class="text-sm">
          <span class="pr-2">Following : {{ randomUser?.following }}</span>
          <span class="p-2">Followers : {{ randomUser?.followers }}</span>
          <span class="p-2">Friends : {{ randomUser?.friends }}</span>
        </div>
        <div v-if="randomUser" class="mt-5">
          <div v-if="randomUser?.user?.tags.length > 0" class="text-xs">
            Interests
          </div>
          <div
            v-for="(interest, index) in randomUser?.user?.tags"
            :key="index"
            class="inline-block mr-2 py-1 font-gbold text-myRed"
          >
            {{ interest }}
          </div>
        </div>
        <div v-if="randomUser" class="pt-6">
          <button
            @click="followThisPerson($route.params.userId)"
            class="bg-myBlue px-4 py-1 font-gbold rounded-sm mr-2"
          >
            Follow +
          </button>
          <button
            @click="makeFriend($route.params.userId)"
            class="bg-myRed px-4 py-1 font-gbold rounded-sm ml-2"
          >
            Friend +
          </button>
        </div>
      </div>
    </div>
    <!-- Bottom -->
    <div ref="masonry" class="posts-container">
      <Post
        v-for="(post, index) in userPosts"
        :key="index"
        :masonry="masonry"
        :post="post"
        class="post"
        :index="index"
        @click="userPostModal = true"
      />
    </div>

    <LoadMore @click="loadMore()" />

    <PostViewModal v-if="userPostModal" @close="userPostModal = false" />
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import Post from "@/components/post/post";
import PostViewModal from "@/components/modals/postViewModal";
import LoadMore from "@/components/loadComponents/loadMore";

import { onMounted, ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { getPostsOfUser, resizing } from "../../composables/posts";
import { useRoute } from "vue-router";
import { socialCircle } from "../../composables/profile";
export default {
  components: { Post, LoadMore, PostViewModal, Icon },
  setup() {
    const masonry = ref(null);
    const userPostModal = ref(false);
    const userPosts = ref([]);
    const randomUser = ref(null);

    const { isLoggedIn } = setUser();
    const route = useRoute();
    const { resizeGridItem } = resizing();
    const { loadUserPosts, loadMore, randomUserPosts } = getPostsOfUser();
    const {
      followThisPerson,
      makeFriend,
      getRandomUserProfile,
      randomUserDetails,
    } = socialCircle();

    onMounted(async () => {
      for (let i = 0; i < 6; i++) userPosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await getRandomUserProfile(route.params.userId);
        randomUser.value = randomUserDetails.value;
      }
    });

    const stopWatchingRandomUser = watch(randomUser, async () => {
      await loadUserPosts(
        route.params.userId,
        randomUser.value?.user?.userName
      );
      userPosts.value = randomUserPosts.value;
      resizeGridItem(masonry.value);
      console.log("user posts", userPosts.value);
      stopWatchingRandomUser();
    });

    watch(randomUserPosts, () => (userPosts.value = randomUserPosts.value));

    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    return {
      loadMore,
      userPostModal,
      userPosts,
      masonry,
      followThisPerson,
      makeFriend,
      randomUser,
    };
  },
};
</script>

<style></style>
