<template>
  <div class="posts-container">
    <div @click="openModal" class="add-post">
      Add post
      <PostSVG class="plus" name="plus" />
    </div>
    <div v-for="(post, index) in posts" :key="index">
      <Post :post="post" />
    </div>
    <AddPostModal v-if="addPostActive" @closeModal="closeModal" />
  </div>
</template>
<script>
// General Posts
// posts/myLatestPost => for the first post
// posts/allLatestPosts => for the latest posts

// User posts
// posts/ => user history posts
// posts/postsOfAChallenge => calendar view ka posts

// Pop up
//posts/getPost => popup call the getpost
import PostSVG from "./modules/post/postSVG";
import Post from "./modules/post/post";
import AddPostModal from "./modules/modals/addPostModal";
// import firebase from "firebase/app";
// import "firebase/auth";
import { mapState } from "vuex";

import axios from "axios";
// const URL = "http://pipo-api.herokuapp.com";
const URL = "http://localhost:3000";

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
  async mounted() {
    axios.get(URL + "/posts").then((result) => {
      console.log(result);
      this.posts = result.data;
    });
  },
  methods: {
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

.plus {
  fill: white;
}

.add-post {
  position: fixed;
  right: 10px;
  top: 75px;
  background-color: #ff6666;
  padding: 10px 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Gilroy !important;
}

.add-post:hover {
  cursor: pointer;
  opacity: 0.9;
}
</style>
