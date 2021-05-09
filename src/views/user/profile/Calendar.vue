<template>
  <div>
    <!-- intro -->
    <div>
      <div>Calendar</div>
      <div>{{ challengeName }}</div>
      <div>
        This is the calendar view for the
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api";

export default {
  computed: mapState({
    config: (state) => state.auth.config,
  }),
  mounted() {
    this.getPostsOfAChallenge();
  },
  data() {
    return {
      challengeName: this.$route.params.challengeName,
      challengePosts: [],
    };
  },
  methods: {
    async getPostsOfAChallenge() {
      try {
        const data = {
          badgeName: this.challengeName,
        };
        const res = await api.get(
          "/posts/postsOfAChallange",
          data,
          this.config
        );
        this.challengePosts = res.data;
        console.log("Challenge posts are :: ", this.challengePosts);
      } catch (error) {
        console.log(
          "Error while retreiving posts of challenge from backend",
          error
        );
      }
    },
  },
};
</script>

<style></style>
