<template>
  <div class="posts-container">
    <!-- add post button -->
    <!-- TODO: add popper showing this is add post -->
    <div
      @click="openModal"
      class="m-auto md:absolute md:right-10 md:top-13 cursor-pointer"
    >
      <div
        class="flex items-center bg-myRed w-10 h-10 rounded-full focus:outline-none enlarge"
      >
        <PostSVG style="fill:white" name="plus" />
      </div>
    </div>

    <!-- posts display -->
    <div v-for="post in posts" :key="post.postId">
      <Post :post="post" />
    </div>

    <AddPostModal v-if="addPostActive" @closeModal="closeModal" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api";

import PostSVG from "@/components/post/postSVG";
import Post from "@/components/post/post";
import AddPostModal from "@/components/modals/addPostModal";

export default {
  name: "general-posts",
  components: {
    Post,
    PostSVG,
    AddPostModal,
  },
  computed: mapState({
    idToken: (state) => state.auth.idToken,
  }),
  data() {
    return {
      posts: [],
      addPostActive: false,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        console.log("auth token", this.idToken);
        const config = {
          headers: {
            Authorization: this.idToken,
          },
        };

        // console.log("config", config);

        const result = await api.get("/posts/allLatestPosts", config);
        const latestPosts = result.data;

        // console.log("latestPosts",latestPosts);

        //data cleaning
        this.posts = latestPosts.filter((post) => post !== null);
      } catch (error) {
        console.error(error);
      }
    },

    openModal() {
      this.addPostActive = true;
    },
    closeModal() {
      this.addPostActive = false;
    },
  },
};
</script>

<style scoped>
.posts-container {
  display: grid;
  width: 80%;
  margin: 10vh auto;
  padding: 10px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
}
</style>
