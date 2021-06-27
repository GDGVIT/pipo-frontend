<template>
  <div @click="addPostModal = true">
    <AddPostBtn />
  </div>
  <!-- posts display -->
  <div class="mt-24">
    <!-- Title -->
    <div class="text-white text-center font-gheavy">
      <div class="text-4xl md:text-5xl tracking-wide">PiPo Daily</div>
      <div class="text-xl text-myRed px-10 mt-5 mb-10 font-gbold">
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

    <div v-if="showLoadMore">
      <LoadMore @click="loadMore()" />
    </div>
  </div>

  <PostViewModal v-if="postModal" @close="postModal = false" />

  <AddPostModal v-if="addPostModal" @closeModal="addPostModal = false" />
</template>

<script>
import {
  defineAsyncComponent,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect,
} from "vue";
import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import LoadingMyLatestPost from "@/components/loadComponents/LoadingMyLatestPost";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";
import AddPostBtn from "@/components/post/addPostBtn";
import { setUser } from "../../composables/auth";
import {
  getPosts,
  originalPosts,
  POSTS_COUNT,
  resizing,
} from "../../composables/posts";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

const MyLatestPost = defineAsyncComponent({
  loader: () =>
    import(
      "@/components/post/myLatestPost" /*webpackChunkName: "MyLatestPost"*/
    ),
  loadingComponent: LoadingMyLatestPost,
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
    const showLoadMore = ref(false);

    const masonry = ref(null);
    const { isLoggedIn } = setUser();
    const { loadPosts, filtered, loadMore } = getPosts();
    const { resizeGridItem } = resizing();
    const { immutablePosts } = originalPosts();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < 5; i++) posts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadPosts();
        posts.value = filtered.value;
        if (immutablePosts.general.length > POSTS_COUNT)
          showLoadMore.value = true;
      }
    });

    onUpdated(() => resizeGridItem(masonry.value));

    watch(filtered, () => (posts.value = filtered.value));

    // For resizing the masonry
    window.addEventListener("resize", () => resizeGridItem(masonry.value));

    return {
      masonry,
      addPostModal,
      postModal,
      posts,
      loadMore,
      showLoadMore,
    };
  },
};
</script>

<style scoped></style>
