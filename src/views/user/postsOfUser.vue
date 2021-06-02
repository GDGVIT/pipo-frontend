<template>
  <div class="font-glight mt-16 text-white">
    <!-- Top details of the user -->
    <h1>These are the posts of the user {{ $route.params.userId }}</h1>
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

    <LoadMore @click="loadMore()" />

    <PostViewModal v-if="userPostModal" @close="userPostModal = false" />
  </div>
</template>

<script>
import Post from "@/components/post/post";
import PostViewModal from "@/components/modals/postViewModal";
import LoadMore from "@/components/loadComponents/loadMore";

import { onMounted, ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";
import { getPostsOfUser, resizing } from "../../composables/posts";
import { useRoute } from "vue-router";
export default {
  components: { Post, LoadMore, PostViewModal },
  setup() {
    const masonry = ref(null);
    const userPostModal = ref(false);
    const userPosts = ref([]);

    const { isLoggedIn } = setUser();
    const route = useRoute();
    const { resizeGridItem } = resizing();
    const { loadUserPosts, loadMore, randomUserPosts } = getPostsOfUser();

    onMounted(() => {
      for (let i = 0; i < 6; i++) userPosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        const userId = route.params.userId;
        const username = route.params.username;
        await loadUserPosts(userId, username);
        userPosts.value = randomUserPosts.value;
        console.log("user posts", userPosts.value);
      }
    });

    watch(randomUserPosts, () => (userPosts.value = randomUserPosts.value));

    window.addEventListener("resize", () => {
      // console.log("Calling resize because window size change");
      resizeGridItem(masonry.value);
    });

    return { loadMore, userPostModal, userPosts, masonry };
  },
};
</script>

<style></style>
