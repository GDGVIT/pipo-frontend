<template>
  <Background name="darkBg" class="bg" />
  <div class="posts-container">
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
    </div>
  </div>
</template>
<script>
import Background from "./modules/backgrounds/bgSVG";
import Post from "./modules/post/post";
export default {
  name: "general-posts",
  components: {
    Background,
    Post,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          username: "Sai",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 2,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 3,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 4,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 5,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },

        {
          id: 6,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },

        {
          id: 7,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 8,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
        {
          id: 9,
          username: "Teja",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam.",
        },
      ],
    };
  },
};
</script>
<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}

.posts-container {
  display: grid;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  margin-top: 10vh;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
}
</style>
