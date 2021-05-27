<template>
  <div class="font-glight mt-16">
    <!-- Top -->
    <div class="flex justify-between items-start py-8 md:py-10 md:px-20">
      <!-- Para -->
      <div class="text-white w-2/3 text-center sm:text-left mx-auto sm:ml-8">
        <div class="font-gbold text-4xl lg:text-5xl tracking-wide">
          Your Posts🌠
        </div>
        <div class="mt-6">
          Welcome back!,
          <span class="text-myRed text-lg font-gbold"
            >{{ user?.userName }}.
          </span>
          Here are all the posts you have posted so far. Post more or challenge
          your buddies to earn points. Remember to maintain your streaks to earn
          those shiny badges ✨.
        </div>
      </div>
      <!-- Add Post button -->
      <div @click="addPostModal = true">
        <AddPostBtn />
      </div>
    </div>
    <!-- Bottom cards -->
    <div ref="masonry" class="posts-container">
      <Post
        v-for="(post, index) in myPosts"
        :key="index"
        :masonry="masonry"
        :post="post"
        class="post"
        :index="index"
        @click="myPostModal = true"
      />
    </div>
    <!-- Load more -->
    <!-- TODO: Currently myPosts is returning all the values -->
    <LoadMore @click="loadMore()" />

    <AddPostModal v-if="addPostModal" @closeModal="addPostModal = false" />

    <PostViewModal v-if="myPostModal" @close="myPostModal = false" />
  </div>
</template>

<script>
import Post from "@/components/post/post";
import LoadMore from "@/components/loadComponents/loadMore";
import PostViewModal from "@/components/modals/postViewModal";
import AddPostBtn from "@/components/post/addPostBtn";
import AddPostModal from "@/components/modals/addPostModal";

import { myPostsFn, resizing } from "../../composables/posts";
import { onMounted, ref, watch, watchEffect } from "vue";
import { setUser } from "../../composables/auth";

export default {
  components: { Post, PostViewModal, LoadMore, AddPostBtn, AddPostModal },
  setup() {
    const myPosts = ref([]);
    const myPostModal = ref(false);
    const masonry = ref(null);
    const addPostModal = ref(false);

    const { loadMyPosts, filtered, loadMore } = myPostsFn();
    const { isLoggedIn, user } = setUser();
    const { resizeGridItem } = resizing();

    //for the purpose of loading cards
    onMounted(() => {
      for (let i = 0; i < 8; i++) myPosts.value.push(null);
    });

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadMyPosts();
        myPosts.value = filtered.value;
      }
    });

    window.addEventListener("resize", () => {
      // console.log("Calling resize because window size change");
      resizeGridItem(masonry.value);
    });

    watch(filtered, () => (myPosts.value = filtered.value));

    return { myPosts, myPostModal, addPostModal, loadMore, masonry, user };
  },
};
</script>

<style scoped></style>
