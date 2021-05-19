<template>
  <div class="font-glight mt-24">
    <!-- Top -->
    <div class="flex justify-between items-start py-10 md:px-20">
      <!-- Para -->
      <div class="text-white w-2/3">
        <div class="font-gbold text-4xl tracking-wide">Recent Posts</div>
        <div class="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          quibusdam quo, repellendus, error ducimus qui tempora necessitatibus
          at iusto nihil ratione modi, fuga veniam soluta possimus doloribus ea
          odit vero.
        </div>
      </div>
      <!-- Add Post button -->
      <div>
        <button class="add-post-btn" type="submit">
          <span class="text-white pl-2">Add Post</span>
          <span class="md:ml-2 text-2xl">+</span>
        </button>
      </div>
    </div>
    <!-- Bottom cards -->
    <div class="posts-container">
      <Post
        v-for="(post, index) in myPosts"
        :key="post.postId"
        :post="post"
        :index="index"
        @click="myPostModal = true"
      />
    </div>
    <!-- Load more -->
    <!-- TODO: Currently myPosts is returning all the values -->
    <LoadMore @click="loadMore()" />

    <PostViewModal v-if="myPostModal" @close="myPostModal = false" />
  </div>
</template>

<script>
import Post from "@/components/post/post";
import LoadMore from "@/components/loadComponents/loadMore";
import PostViewModal from "@/components/modals/postViewModal";

import { myPostsFn } from "../../composables/posts";
import { ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";

export default {
  components: { Post, PostViewModal, LoadMore },
  setup() {
    const myPosts = ref(null);
    const myPostModal = ref(false);

    const { loadMyPosts, filtered, loadMore } = myPostsFn();
    const { isLoggedIn } = setUser();

    watchEffect(() => {
      if (isLoggedIn.value) {
        loadMyPosts();
        myPosts.value = filtered.value;
      }
    });

    watch(filtered, () => (myPosts.value = filtered.value));

    return { myPosts, myPostModal, loadMore };
  },
};
</script>

<style scoped></style>
