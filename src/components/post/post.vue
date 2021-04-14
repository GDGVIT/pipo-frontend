<template>
  <div
    :style="{ border: '4px solid ' + border }"
    class="bg-gray-50 font-glight"
  >
    <div class="post-details">
      <div class="user-details">
        <span class="username">@ Sai Teja</span>
        <span class="streak-btn font-semibold ml-2 text-xs">12345</span>
      </div>
      <div class="upvote-details">
        <postSVG name="likeLight" />
        <span style="font-size:12px">{{ post.upvoted.length }}</span>
      </div>
    </div>
    <div class="post-body">
      <div class="text-xl font-bold my-2 tracking-wider">
        {{ post.title }}
      </div>
      <div class="tracking-wide">
        {{ post.description }}
      </div>
      <div class="flex flex-col justify-items-center">
        <div v-for="(img, index) in post.image" :key="index">
          <img :src="img" alt="post-image" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postSVG from "./postSVG";
import { stringToColor } from "@/generate.js";
import { mapState } from "vuex";
// import api from "@/api.js";

export default {
  name: "post",
  props: ["post"],
  components: {
    postSVG,
  },
  computed: {
    ...mapState({
      authToken: (state) => state.auth.idToken,
    }),
  },
  data() {
    return {
      border: "",
    };
  },
  mounted() {
    //setting borders
    const border = stringToColor(this.post.badgeName);
    this.border = border;
  },
};
</script>
