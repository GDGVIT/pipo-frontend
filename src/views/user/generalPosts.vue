<template>
  <!-- add post button -->
  <div>
    <div
      @click="addPostModal = true"
      class="cursor-pointer mt-24 mb-2 m-auto w-40"
    >
      <div class="add-post-btn">
        <span class="hidden md:block ">Add Post</span>
        <span class="md:ml-2 text-2xl">+</span>
      </div>
    </div>
  </div>

  <!-- posts display -->
  <div>
    <div class="text-white text-4xl text-center font-gbold">PiPo Daily 📰</div>
    <div class="posts-container">
      <MyLatestPost />
      <Post
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        @open="postModal = true"
      />
    </div>

    <LoadMore @click="incrementCount()" />
  </div>

  <PostViewModal v-if="postModal" @close="postModal = false" />

  <AddPostModal v-if="addPostModal" @closeModal="addPostModal = false" />
</template>

<script>
import { defineAsyncComponent, ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { getPosts } from "../../composables/posts";

import LoadMore from "@/components/loadComponents/loadMore";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";
// import Post from "@/components/post/post";

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
  },
  setup() {
    const addPostModal = ref(false);
    const postModal = ref(false);
    const posts = ref(null);

    const { isLoggedIn } = setUser();
    const { loadPosts, filtered, loadMore } = getPosts();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        // console.log("Logged in or count value changed");
        await loadPosts();
        posts.value = filtered.value;
      }
    });

    watch(filtered, () => (posts.value = filtered.value));

    //TODO: Check upvotes once

    const incrementCount = async () => {
      console.log("I'm clicking general posts increment count");
      loadMore();
    };

    return {
      addPostModal,
      postModal,
      posts,
      incrementCount,
    };
  },
};
</script>

<style scoped></style>
