<template>
  <!-- Go back -->
  <router-link to="/user/profile">
    <LeftArrow name="leftArrow" class="absolute top-4 left-10" />
  </router-link>

  <!-- Intro -->
  <div class="text-center font-glight">
    <div class="text-3xl font-gbold my-4">Badges</div>
    <div class="my-2">
      These are the badges you have achieved so far!. Flaunt them in front of
      your friends. You deserve these badges!
    </div>
  </div>
  <!-- Badges -->
  <div
    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 place-items-center overflow-y-auto h-3/4"
  >
    <div
      class="w-20 h-20 grid place-items-center m-2 shadow-md"
      v-for="(badge, index) in earnedBadgesInfo"
      :key="index"
    >
      <img
        class="w-16 h-16"
        :src="badge.earnedBadgePic"
        alt="earned-badge-pic"
      />
    </div>
  </div>
</template>

<script>
import { stringToColor, generateIdenticon } from "@/generate.js";
import LeftArrow from "@/components/user/userIcons";

export default {
  components: {
    LeftArrow,
  },
  data() {
    return {
      earnedBadges: [
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
        "React",
      ],
      earnedBadgesInfo: [],
    };
  },
  mounted() {
    this.earnedBadgesInfo = this.earnedBadges.map((badge) => {
      const badgeObj = {
        earnedBadgePic: generateIdenticon(badge),
        borderColor: stringToColor(badge),
      };

      return badgeObj;
    });
  },
};
</script>

<style></style>
