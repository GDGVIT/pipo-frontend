<template>
  <div @click="addPostModal = true">
    <AddPostBtn />
  </div>
  <!-- Confetti background -->
  <canvas id="confetti-holder" class="fixed top-0 w-full h-full -z-5" />
  <!-- Followers posts display -->
  <div class="mt-24">
    <div class="text-white text-center font-gbold">
      <div class="text-2xl sm:text-4xl md:text-5xl tracking-wide">
        <span>Daily Feed</span>
        <div class="mx-2 inline-block" @click="showHomeInfo = true">
          <Icon name="info" />
        </div>
      </div>
      <div class="text-sm sm:text-xl text-myRed px-10 mt-5 mb-10 font-gbold">
        The up-to-date posts of people you follow
      </div>
    </div>
    <div ref="masonry" class="posts-container">
      <Post
        v-for="(post, index) in homePosts"
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

    <div
      v-if="!homePosts.length"
      class="my-16 text-center font-gbold p-8 text-lg bg-myBlue rounded-sm sm:w-1/2 mx-auto text-white animate-floating"
    >
      Oh no! 😫 looks like you have no friends 🤐. Start following people who
      share your interests 😍 and get to see their daily updates from here.
      <div></div>
    </div>

    <div v-if="showMore">
      <LoadMore @click="loadMore()" />
    </div>

    <PostViewModal v-if="postModal" @close="postModal = false" />

    <AddPostModal
      v-if="addPostModal"
      @confetti="showConfetti = true"
      @closeModal="addPostModal = false"
    />

    <!-- Info modal for completed badges -->
    <InfoModal
      @close="showHomeInfo = false"
      v-if="showHomeInfo"
      modal="homeInfo"
      :hideBackground="true"
    />
  </div>
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
} from "@vue/runtime-core";
import ConfettiGenerator from "confetti-js";
import InfoModal from "@/components/modals/infoModal";
import AddPostModal from "@/components/modals/addPostModal";
import AddPostBtn from "@/components/post/addPostBtn";
import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import PostViewModal from "@/components/modals/postViewModal";
import { home, resizing, POSTS_COUNT } from "@/composables/posts";
import { setUser } from "@/composables/auth";
import Icon from "@/components/user/userIcons";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  components: {
    Post,
    PostViewModal,
    LoadMore,
    AddPostModal,
    AddPostBtn,
    Icon,
    InfoModal,
  },
  setup() {
    const addPostModal = ref(false);
    const postModal = ref(false);
    const homePosts = ref([]);
    const showHomeInfo = ref(false);

    const masonry = ref(null);
    const { isLoggedIn } = setUser();
    const { resizeGridItem } = resizing();
    const { loadHomePosts, filtered, loadMore, showMore } = home();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < POSTS_COUNT; i++) homePosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadHomePosts();
        homePosts.value = filtered.value;
      }
    });

    watch(filtered, () => (homePosts.value = filtered.value));

    onUpdated(() => resizeGridItem(masonry.value));

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
      homePosts,
      showConfetti,
      loadMore,
      showMore,
      showHomeInfo,
    };
  },
};
</script>

<style scoped></style>
