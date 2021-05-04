<template>
  <!-- TODO: Add the open box feature-->
  <div
    :style="{ border: '4px solid ' + border }"
    class="bg-gray-50 font-glight p-9 transition duration-200 ease-in-out transform hover:scale-105"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="text-xl font-gbold">@ {{ post?.username }}</span>
        <span class="streak-btn font-semibold ml-2 text-xs">{{
          post.points
        }}</span>
      </div>
      <div class="flex items-center">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post.upvoted?.length }}</span>
      </div>
    </div>
    <div class="">
      <div class="text-2xl font-gbold tracking-widest my-8">
        {{ post?.title }}
      </div>
      <div class="tracking-wider">
        {{ post?.description }}
      </div>
      <div class="flex flex-col justify-items-center mt-5">
        <div v-for="(img, index) in post?.image" :key="index">
          <img :src="img" alt="post-image" />
        </div>
      </div>
      <div class="flex mt-4">
        <div class="tag" v-for="(tag, index) in post?.tags" :key="index">
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
