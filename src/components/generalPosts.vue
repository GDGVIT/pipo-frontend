<template>
  <Background name="darkBg" class="bg" />
  <div class="posts-container">
    <div v-for="index in 10" :key="index">
      <Post />
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
