<template>
  <div @click="addPostModal = true">
    <AddPostBtn />
  </div>
  <!-- Confetti background -->
  <canvas id="confetti-holder" class="fixed top-0 w-full h-full -z-5" />
  <!-- posts display -->
  <div class="mt-24">
    <!-- Title -->
    <div class="text-white text-center font-gbold">
      <div class="text-2xl sm:text-4xl md:text-5xl tracking-wide">
        Leaderboard
      </div>
      <div class="text-sm sm:text-xl text-myRed px-10 mt-5 mb-10 font-gbold">
        Add Posts. Gain Upvotes. Earn Points and Badges.
      </div>
    </div>
    <div ref="masonry" class="posts-container">
      <MyLatestPost :masonry="masonry" class="post" />
      <Post
        v-for="(post, index) in posts"
        :masonry="masonry"
        :key="index"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        class="post"
        :post="post"
        :index="index"
        @open="postModal = true"
      />
    </div>

    <div v-if="showMore">
      <LoadMore @click="loadMore()" />
    </div>
  </div>

  <PostViewModal v-if="postModal" @close="postModal = false" />

  <AddPostModal
    v-if="addPostModal"
    @confetti="showConfetti = true"
    @closeModal="addPostModal = false"
  />
</template>

<script>
import {
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect,
} from "vue";
import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import MyLatestPost from "@/components/post/myLatestPost";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";
import AddPostBtn from "@/components/post/addPostBtn";
import ConfettiGenerator from "confetti-js";
import { setUser } from "@/composables/auth";
import { getPosts, resizing, POSTS_COUNT } from "@/composables/posts";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  name: "general-posts",
  components: {
    Post,
    AddPostModal,
    PostViewModal,
    MyLatestPost,
    LoadMore,
    AddPostBtn,
  },
  setup() {
    const addPostModal = ref(false);
    const postModal = ref(false);
    const posts = ref([]);

    const masonry = ref(null);
    const { isLoggedIn } = setUser();
    const { loadPosts, filtered, loadMore, showMore } = getPosts();
    const { resizeGridItem } = resizing();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < POSTS_COUNT; i++) posts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadPosts();
        posts.value = filtered.value;
      }
    });

    onUpdated(() => resizeGridItem(masonry.value));

    watch(filtered, () => (posts.value = filtered.value));

    // For resizing the masonry
    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    // For confetti showcase
    const showConfetti = ref(false);
    let confettiInterval = null;
    let confetti = null;
    const confettiSettings = {
      target: "confetti-holder",
      max: 150,
      rotate: true,
    };

    const runConfetti = () => {
      let time = 5;
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      confettiInterval = setInterval(() => {
        if (!time) {
          showConfetti.value = false;
          confetti.clear();
          clearInterval(confettiInterval);
        }
        time--;
      }, 1000);
    };

    watch(showConfetti, () => {
      if (showConfetti.value) {
        runConfetti();
      }
    });

    onBeforeUnmount(() => {
      if (confettiInterval) {
        clearInterval(confettiInterval);
        showConfetti.value = false;
      }
    });

    return {
      masonry,
      addPostModal,
      postModal,
      posts,
      loadMore,
      showMore,
      showConfetti,
    };
  },
};
</script>

<style scoped></style>
