<template>
  <div
    :style="{ border: '4px solid ' + border }"
    class="bg-gray-50 font-glight"
    @click="this.$emit('open', post?.index)"
  >
    <div class="post-details">
      <div class="user-details">
        <span class="username">@ {{ post?.username }}</span>
        <span class="streak-btn font-semibold ml-2 text-xs">{{
          post.points
        }}</span>
      </div>
      <div class="upvote-details">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post.upvoted?.length }}</span>
      </div>
    </div>
    <div class="post-body">
      <div class="text-xl font-bold my-2 tracking-wider">
        {{ post?.title }}
      </div>
      <div class="tracking-wide">
        {{ post?.description }}
      </div>
      <div class="flex flex-col justify-items-center">
        <div v-for="(img, index) in post?.image" :key="index">
          <img :src="img" alt="post-image" />
        </div>
      </div>
      <div>
        <div v-for="(tag, index) in post?.tags" :key="index">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
import { stringToColor } from "@/generate.js";

export default {
  name: "post",
  props: ["post"],
  components: {
    postSVG,
  },
  data() {
    return {
      border: "",
    };
  },
  mounted() {
    //setting borders
    const border = stringToColor(this.post?.badgeName);
    this.border = border;
  },
};
</script>
