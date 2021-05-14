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
    <div
      class="sm:w-11/12 mx-auto mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10"
    >
      <MyLatestPost />
      <Post
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        @open="postModal = true"
      />
    </div>
    <div
      @click="incrementCount()"
      class="font-gbold text-white text-center pb-2 cursor-pointer py-2 border-white border-b-2 mb-9 w-28 m-auto"
    >
      Load More +
    </div>
  </div>

  <PostViewModal v-if="postModal" @close="postModal = false" />

  <AddPostModal v-if="addPostModal" @closeModal="addPostModal = false" />
</template>

<script>
import { defineAsyncComponent, ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { getPosts } from "../../composables/posts";

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
  },
  setup() {
    const addPostModal = ref(false);
    const postModal = ref(false);
    const posts = ref(null);

    const { isLoggedIn } = setUser();
    const { loadPosts, filtered, count } = getPosts();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        console.log("Logged in or count value changed");
        await loadPosts();
        posts.value = filtered.value;
      }
    });

    watch(filtered, () => (posts.value = filtered.value));

    //TODO: Check upvotes once
    const incrementCount = async () => {
      count.value -= 5;
      await loadPosts();
      posts.value = filtered.value;
    };

    return { addPostModal, postModal, posts, incrementCount };
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
