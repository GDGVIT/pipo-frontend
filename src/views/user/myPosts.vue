<template>
  <div class="font-glight mt-16">
    <!-- Top -->
    <div class="flex justify-between items-start py-8 md:py-10 md:px-20">
      <!-- Para -->
      <div class="text-white w-2/3 text-center sm:text-left mx-auto sm:ml-8">
        <div class="font-gbold text-2xl sm:text-4xl lg:text-5xl tracking-wide">
          Your Posts🌠
        </div>
        <div class="mt-6 text-sm sm:text-base">
          Welcome back!,
          <span class="text-myRed text-lg font-gbold"
            >{{ user?.userName ? user?.userName : "anonymous" }}.
          </span>
          Here are all the posts you have posted so far. Earn points by gaining
          more upvotes to your posts. Remember to maintain your streaks to earn
          those shiny badges ✨.
        </div>
      </div>
      <!-- Add Post button -->
      <div @click="addPostModal = true">
        <AddPostBtn />
      </div>
    </div>

    <!-- Confetti background -->
    <canvas id="confetti-holder" class="fixed top-0 w-full h-full -z-5" />
    <!-- Bottom cards -->
    <div ref="masonry" class="posts-container">
      <Post
        v-for="(post, index) in myPosts"
        :key="index"
        :masonry="masonry"
        :post="post"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        class="post"
        :index="index"
        @click="myPostModal = true"
      />
    </div>

    <div
      v-if="!myPosts.length"
      class="my-16 text-center font-gbold p-8 text-lg bg-myBlue rounded-sm sm:w-1/2 mx-auto text-white animate-floating"
    >
      You haven't posted anything yet 😗. Add a new post and select any
      challenge you would like to work on and earn badges.🔥
    </div>

    <div v-if="showMore">
      <LoadMore @click="loadMore()" />
    </div>

    <AddPostModal
      v-if="addPostModal"
      @confetti="showConfetti = true"
      @closeModal="addPostModal = false"
    />

    <PostViewModal
      v-if="myPostModal"
      @confetti="showConfetti = true"
      @close="myPostModal = false"
    />
  </div>
</template>

<script>
import LoadMore from "@/components/loadComponents/loadMore";
import PostViewModal from "@/components/modals/postViewModal";
import AddPostBtn from "@/components/post/addPostBtn";
import AddPostModal from "@/components/modals/addPostModal";
import ConfettiGenerator from "confetti-js";

import { myPostsFn, resizing, POSTS_COUNT } from "../../composables/posts";
import {
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect,
} from "vue";
import { setUser } from "../../composables/auth";

import LoadingCard from "@/components/loadComponents/LoadingCard";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  components: { Post, PostViewModal, LoadMore, AddPostBtn, AddPostModal },
  setup() {
    const myPosts = ref([]);
    const myPostModal = ref(false);
    const masonry = ref(null);
    const addPostModal = ref(false);

    const { loadMyPosts, filtered, loadMore, showMore } = myPostsFn();
    const { isLoggedIn, user } = setUser();
    const { resizeGridItem } = resizing();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < POSTS_COUNT; i++) myPosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadMyPosts();
        myPosts.value = filtered.value;
        resizeGridItem(masonry.value);
      }
    });

    onUpdated(() => resizeGridItem(masonry.value));

    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    watch(filtered, () => (myPosts.value = filtered.value));

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
      myPosts,
      myPostModal,
      addPostModal,
      loadMore,
      masonry,
      user,
      showMore,
      showConfetti,
    };
  },
};
</script>

<style scoped></style>
