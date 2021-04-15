<template>
  <div
    @click="this.$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white z-20 bottom-10 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-3/4 md:m-auto lg:w-2/3"
  >
    <div>
      <PostSVG
        class="cursor-pointer w-3"
        @click="this.$emit('shift', -1)"
        name="leftArrow"
      />
    </div>
    <div>
      <div>
        <div>@ {{ post?.username }}</div>
        <div>{{ post?.points }}</div>
      </div>
      <div>
        <div>
          <PostSVG
            class="cursor-pointer"
            @click="toggleLike"
            :name="liked ? 'likeDark' : 'likeLight'"
          />
          <span>{{ post?.upvoted.length }}</span>
        </div>
        <PostSVG name="comment" />
      </div>
      <div>
        date: 12-04-21
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
          <img class="w-96" :src="img" alt="post-image" />
        </div>
      </div>
      <div>
        <div v-for="(tag, index) in post?.tags" :key="index">
          {{ tag }}
        </div>
      </div>
    </div>
    <div>
      <PostSVG @click="this.$emit('shift', 1)" name="rightArrow" />
    </div>
  </div>
</template>

<script>
import PostSVG from "../post/postSVG";
import { mapState } from "vuex";
import api from "@/api.js";

export default {
  components: {
    PostSVG,
  },
  props: ["post"],
  emits: ["upvote", "close", "shift"],
  computed: {
    ...mapState({
      authToken: (state) => state.auth.idToken,
    }),
  },
  data() {
    return {
      liked: false, //TODO: doesn't change the UI
    };
  },
  methods: {
    async toggleLike() {
      try {
        const config = {
          headers: {
            Authorization: this.authToken,
          },
        };
        const data = {
          postId: this.post.postId,
        };
        console.log(this.post.postId);
        if (!this.liked) {
          const result = await api.post("/posts/upvote", data, config);
          console.log(result);
          if (result.message) window.alert(result.message);
          this.$emit("upvote", this.post?.index);
          this.liked = !this.liked;
        }
      } catch (error) {
        console.log("Unable to upvote ", error);
      }
    },
  },
};
</script>

<style></style>
