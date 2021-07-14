<template>
  <div class="mt-24">
    <div class="text-white text-center font-gbold">
      <div class="text-4xl md:text-5xl tracking-wide">
        Daily Feed
      </div>
    </div>
    <div ref="masonry" class="posts-container">
      <Post
        v-for="(post, index) in homePosts"
        :masonry="masonry"
        :key="index"
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

    <div v-if="showLoadMore">
      <LoadMore @click="loadMore()" />
    </div>

    <PostViewModal v-if="postModal" @close="postModal = false" />
  </div>
</template>

<script>
import {
  defineAsyncComponent,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect,
} from "@vue/runtime-core";
import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import PostViewModal from "@/components/modals/postViewModal";
import {
  home,
  originalPosts,
  resizing,
  POSTS_COUNT,
} from "../../composables/posts";
import { setUser } from "../../composables/auth";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  components: { Post, PostViewModal, LoadMore },
  setup() {
    const postModal = ref(false);
    const homePosts = ref([]);
    const showLoadMore = ref(false);

    const masonry = ref(null);
    const { isLoggedIn } = setUser();
    const { resizeGridItem } = resizing();
    const { loadHomePosts, filtered, loadMore } = home();
    const { immutablePosts } = originalPosts();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < 5; i++) homePosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadHomePosts();
        homePosts.value = filtered.value;
        if (immutablePosts.general.length > POSTS_COUNT)
          showLoadMore.value = true;
      }
    });

    watch(filtered, () => (homePosts.value = filtered.value));

    onUpdated(() => resizeGridItem(masonry.value));

    // For resizing the masonry
    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    return {
      masonry,
      postModal,
      homePosts,
      loadMore,
      showLoadMore,
    };
  },
};
</script>

<style></style>
