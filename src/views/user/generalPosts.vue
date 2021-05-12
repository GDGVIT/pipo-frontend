<template>
  <!-- add post button -->
  <div>
    <div
      @click="addPostModal = true"
      class="cursor-pointer mt-20 mb-2 m-auto w-40"
    >
      <div class="add-post-btn">
        <PostSVG style="fill:white" name="plus" />
        <span class="text-white font-gbold">Add Post</span>
      </div>
    </div>
  </div>

  <!-- posts display -->
  <div class="sm:w-5/6 mx-auto mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Post
      v-for="(post, index) in posts"
      :key="post.id"
      :post="post"
      :index="index"
      @open="postModal = true"
    />
  </div>

  <PostViewModal v-if="postModal" @close="postModal = false" />

  <AddPostModal v-if="addPostModal" @closeModal="addPostModal = false" />
</template>

<script>
import { defineAsyncComponent, ref, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { getPosts } from "../../composables/posts";

import PostSVG from "@/components/post/postSVG";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";
// import Post from "@/components/post/post";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  name: "general-posts",
  components: {
    Post,
    PostSVG,
    AddPostModal,
    PostViewModal,
  },
  setup() {
    const addPostModal = ref(false);
    const postModal = ref(false);
    const posts = ref(null);

    const { isLoggedIn } = setUser();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        const { loadPosts, fetchPosts } = getPosts();
        await loadPosts();
        posts.value = fetchPosts();
      }
    });

    return { addPostModal, postModal, posts };
  },
};
</script>

<style scoped>
.posts-container {
  display: grid;
  margin: 0 auto;
  padding: 10px;
  width: 90%;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
}
</style>
