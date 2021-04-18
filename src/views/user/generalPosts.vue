<template>
  <!-- add post button -->
  <!-- TODO: add popper showing this is add post -->
  <div>
    <div @click="openModal" class="cursor-pointer mt-20 mb-2 w-32 m-auto">
      <div
        class="flex items-center bg-myRed pr-3 h-10 rounded-full focus:outline-none enlarge"
      >
        <PostSVG style="fill:white" name="plus" />
        <span class="text-white font-gbold">Add Post</span>
      </div>
    </div>
  </div>
  <div class="posts-container">
    <!-- posts display -->
    <div v-for="post in posts" :key="post.postId">
      <Post class="cursor-pointer" :post="post" @open="openPost" />
    </div>

    <PostViewModal
      v-if="postViewActive"
      @upvote="upvotePost"
      @downvote="downvotePost"
      @close="closePost"
      :post="posts[currentModalPostIndex]"
      @shift="shiftIndex"
    />
    <AddPostModal v-if="addPostActive" @closeModal="closeModal" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api";

import PostSVG from "@/components/post/postSVG";
import Post from "@/components/post/post";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";

export default {
  name: "general-posts",
  components: {
    Post,
    PostSVG,
    AddPostModal,
    PostViewModal,
  },
  computed: mapState({
    idToken: (state) => state.auth.idToken,
  }),
  data() {
    return {
      posts: [],
      addPostActive: false,
      postViewActive: false,
      currentModalPostIndex: 0,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    shiftIndex(factor) {
      if (factor === -1 && this.currentModalPostIndex !== 0) {
        this.currentModalPostIndex += factor;
      } else if (
        factor === +1 &&
        this.currentModalPostIndex !== this.posts.length - 1
      ) {
        this.currentModalPostIndex += factor;
      }
    },
    openPost(index) {
      console.log("open posted clicked by " + index);
      this.postViewActive = true; //if not set to true
      this.currentModalPostIndex = index;
    },
    closePost() {
      this.postViewActive = false;
      this.currentModalPostIndex = 0;
      this.currentModalPost = {};
    },
    upvotePost(index) {
      console.log("upvote clicked in general posts", index);
      this.posts[index].upvoted.push("currentUser"); //TODO: Change to userID
    },
    downvotePost(index) {
      console.log("downvote clicked in general posts", index);
      this.posts[index].upvoted.splice(0, 1); //TODO: find user and remove that user
    },
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
        const latestPosts = result.data.posts;

        console.log("latestPosts", latestPosts);

        //data cleaning
        this.posts = latestPosts
          .filter((post) => post !== null)
          .map((post, index) => {
            if (post.upvoted === null) post.upvoted = [];
            if (post.username === null) post.username = "anonymous";
            // TODO: Remove this later once tags are added
            post.tags = ["Tag 1", "Tag 2", "Tag 3"];

            //changing date format
            let date = post.createDate;
            post.createDate =
              date.substring(0, 10) + " " + date.substring(11, 19);

            post.index = index;
            return post;
          });
      } catch (error) {
        console.error(error);
      }
    },

    openModal() {
      this.addPostActive = true;
    },
    closeModal(post) {
      if (post) {
        console.log("Post received by general posts", post);
        this.posts[0] = post;
      }
      this.addPostActive = false;
    },
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
