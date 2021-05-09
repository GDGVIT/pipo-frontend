<template>
  <!-- Go back -->
  <router-link to="/user/profile">
    <LeftArrow name="leftArrow" class="absolute top-4 left-10" />
  </router-link>

  <!-- Intro -->
  <div class="text-center font-glight">
    <div class="text-3xl font-gbold my-4">In Progress Badges</div>
    <div class="my-2">
      These are the badges you are currently striving for!
    </div>
  </div>
  <!-- Badges -->
  <div
    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 place-items-center overflow-y-auto h-3/4"
  >
    <div
      class=" w-20 h-20 grid place-items-center m-2 shadow-md relative"
      v-for="(badge, index) in inProgressBadges"
      :key="index"
    >
      <img
        @click="this.$router.push(`/user/in-progress/${badge.badgeName}`)"
        class="w-16 h-16"
        :src="badge.identicon"
        alt="earned-badge-pic"
      />
    </div>
  </div>
</template>

<script>
import { stringToColor, generateIdenticon } from "@/generate.js";
import LeftArrow from "@/components/user/userIcons";
import api from "@/api";
import { mapState } from "vuex";

export default {
  components: {
    LeftArrow,
  },
  computed: mapState({
    config: (state) => state.auth.config,
  }),
  data() {
    return {
      inProgressBadges: [],
    };
  },
  mounted() {
    this.getInProgressBadges();
  },
  methods: {
    async getInProgressBadges() {
      try {
        const res = await api.get("/badge/inProgress", this.config);
        this.inProgressBadges = res.data.arr.map((e) => {
          return {
            ...e,
            identicon: generateIdenticon(e.badgeName),
            border: stringToColor(e.badgeName),
          };
        });
      } catch (error) {
        console.log(
          "Error occured while retrieving inprogress badges from backend",
          error
        );
      }
    },
  },
};
</script>

<style></style>
