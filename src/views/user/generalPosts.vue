<template>
  <!-- add post button -->
  <div>
    <div @click="openModal" class="cursor-pointer mt-20 mb-2 m-auto w-40">
      <div class="add-post-btn">
        <PostSVG style="fill:white" name="plus" />
        <span class="text-white font-gbold">Add Post</span>
      </div>
    </div>
  </div>
  <div class="posts-container">
    <!-- posts display -->
    <div v-for="post in posts" :key="post.postId">
      <Post :post="post" @open="openPost" />
    </div>

    <PostViewModal
      v-if="postViewActive"
      @upvote="upvotePost"
      @downvote="downvotePost"
      @close="closePost"
      :post="posts[currentModalPostIndex]"
      @shift="shiftIndex"
    />
    <AddPostModal
      v-if="addPostActive"
      @onPost="addPost"
      @closeModal="closeModal()"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { defineAsyncComponent } from "vue";

import api from "@/api";

import PostSVG from "@/components/post/postSVG";
import LoadingCard from "@/components/loadComponents/LoadingCard";
import AddPostModal from "@/components/modals/addPostModal";
import PostViewModal from "@/components/modals/postViewModal";

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
  computed: {
    ...mapState({
      config: (state) => state.auth.config,
    }),
    ...mapGetters({
      filteredPosts: "generalPosts",
    }),
  },
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
    console.log(this.filteredPosts);
  },
  methods: {
    closeModal() {
      this.addPostActive = false;
    },
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
    addPost(post) {
      // update my latest post to the currently added post
      this.post[0] = post;
    },
    openPost(index) {
      console.log("open posted clicked by " + index);
      this.postViewActive = true; //if not set to true
      this.currentModalPostIndex = index;
    },
    closePost() {
      this.postViewActive = false;
      this.currentModalPost = {};
    },
    upvotePost(index) {
      console.log("Upvoted the post which is at the index " + index);
      this.posts[index].upvoted.push("currentUser"); //TODO: Change to userID
    },
    downvotePost(index) {
      console.log("Downvoted the post which is at the " + index);
      this.posts[index].upvoted.splice(0, 1); //TODO: find user and remove that user
    },
    async getPosts() {
      try {
        const result = await api.get("/posts/allLatestPosts", this.config);
        const latestPosts = result.data.posts;

        console.log("latestPosts", latestPosts);

        //data cleaning
        const posts = latestPosts
          .filter((post) => post !== null)
          .map((post, index) => {
            if (post.upvotes === null) post.upvotes = [];
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

        this.posts = posts;
      } catch (error) {
        console.error(error);
      }
    },

    openModal() {
      this.addPostActive = true;
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
