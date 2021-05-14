<template>
  <div class="font-glight mt-16">
    <!-- Top -->
    <div class="flex justify-between items-start py-10 md:px-20">
      <!-- Para -->
      <div class="text-white w-2/3">
        <div class="font-gbold text-4xl tracking-wide">Recent Posts</div>
        <div class="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          quibusdam quo, repellendus, error ducimus qui tempora necessitatibus
          at iusto nihil ratione modi, fuga veniam soluta possimus doloribus ea
          odit vero.
        </div>
      </div>
      <!-- Add Post button -->
      <div>
        <button class="add-post-btn" type="submit">
          <span class="text-white pl-2">Add Post</span>
          <span class="md:ml-2 text-2xl">+</span>
        </button>
      </div>
    </div>
    <!-- Bottom cards -->
    <div class="my-posts-container md:px-20">
      <!-- TODO get posts -->
      <div
        class="bg-white p-6"
        v-for="(post, index) in computedPosts"
        :key="index"
      >
        <div class="flex justify-between">
          <div class="text-2xl font-gbold w-48">{{ post?.title }}</div>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <Icon name="likeLight" />
              <span class="text-sm mr-10">{{ post?.upvoted.length }}</span>
            </div>
            <div class="text-xs text-gray-400">{{ post?.createDate }}</div>
          </div>
        </div>
        <div>
          <div>{{ post?.description }}</div>
          <div v-for="(i, index) in post?.image" :key="index">
            <img :src="i" alt="post-image" />
          </div>
        </div>
      </div>
    </div>
    <!-- Load more -->
    <div class="text-center py-10">
      <!-- TODO Load more -->
      <u class="text-white cursor-pointer">load more results</u>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/post/postSVG";

import api from "@/api";
import { timeAgo } from "@/generate";
import { mapState } from "vuex";

export default {
  name: "my-posts",
  components: { Icon },
  mounted() {
    this.getUserPosts();
  },
  data() {
    return {
      userPosts: [],
      limit: 6,
    };
  },
  computed: {
    computedPosts: function() {
      console.log(this.userPosts);
      return this.userPosts;
    },
    ...mapState({
      authToken: (state) => state.auth.idToken,
    }),
  },
  methods: {
    async getUserPosts() {
      // Getting posts of user
      const config = {
        headers: { Authorization: this.authToken },
      };
      const res = await api.get("/posts", config);
      console.log("Response for user posts", res);

      this.userPosts = res.data.map((post) => {
        post.createDate = timeAgo(new Date(), new Date(post.createDate));
        post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate));
        post.upvoted = post.upvoted === null ? [] : post.upvoted;
        post.tags = ["tag1", "tag2", "tag3"];

        return post;
      });
    },
  },
};
</script>

<style scoped>
.my-posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
}
</style>
