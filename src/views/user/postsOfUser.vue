<template>
  <div class="font-glight mt-16 text-white">
    <!-- Top details of the user -->
    <div class="p-8 grid md:grid-cols-4">
      <!-- Profile pic -->
      <div class="grid place-items-center">
        <div class="relative">
          <div v-if="randomUser?.user?.picture">
            <img
              class="w-32 h-32 md:w-40 md:h-40 rounded-full"
              :src="randomUser?.user?.picture"
              alt="profile-pic"
              referrerpolicy="no-referrer"
            />
          </div>
          <div v-else>
            <Icon name="profileIcon" />
          </div>
          <div
            class="absolute top-2 right-0 bg-myRed text-white font-gbold px-2 rounded-full"
          >
            {{ randomUser?.user?.points ? randomUser.user.points : 0 }} pts
          </div>
        </div>
      </div>
      <!-- Content -->
      <div class="pt-3 pb-8 text-center md:text-left md:col-span-3">
        <div class="font-gbold text-4xl md:text-5xl py-5">
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
            class="inline-block mr-2 py-1 font-gbold text-myRed break-all"
          >
            {{ interest }}
          </div>
        </div>
        <div v-if="randomUser" class="pt-6">
          <button
            @click="followThisPerson($route.params.userId)"
            class="bg-myBlue px-4 py-1 font-gbold rounded-sm mr-2"
          >
            Follow
          </button>
          <button
            @click="makeFriend($route.params.userId)"
            class="bg-myRed px-4 py-1 font-gbold rounded-sm ml-2"
          >
            Friend
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

    <div v-if="showLoadMore">
      <LoadMore @click="loadMore()" />
    </div>

    <PostViewModal v-if="userPostModal" @close="userPostModal = false" />
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import PostViewModal from "@/components/modals/postViewModal";
import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import {
  defineAsyncComponent,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect,
} from "vue";
import { setUser } from "../../composables/auth";
import {
  getPostsOfUser,
  originalPosts,
  POSTS_COUNT,
  resizing,
} from "../../composables/posts";
import { useRoute } from "vue-router";
import { socialCircle } from "../../composables/profile";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  components: { Post, LoadMore, PostViewModal, Icon },
  setup() {
    const masonry = ref(null);
    const userPostModal = ref(false);
    const userPosts = ref([]);
    const randomUser = ref(null);
    const showLoadMore = ref(false);
    const u = ref(null);

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

    const { immutablePosts } = originalPosts();

    onMounted(async () => {
      for (let i = 0; i < POSTS_COUNT; i++) userPosts.value.push(null);
    });

    onUpdated(() => resizeGridItem(masonry.value));

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await getRandomUserProfile(route.params.userId);
        randomUser.value = randomUserDetails.value;

        u.value = randomUser.value.user;

        await loadUserPosts(route.params.userId, u);
        userPosts.value = randomUserPosts.value;

        if (immutablePosts.randomUser.length > POSTS_COUNT)
          showLoadMore.value = true;
      }
    });

    watch(randomUserPosts, () => (userPosts.value = randomUserPosts.value));

    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    return {
      userPostModal,
      userPosts,
      masonry,
      followThisPerson,
      makeFriend,
      randomUser,
      loadMore,
      showLoadMore,
    };
  },
};
</script>

<style></style>
