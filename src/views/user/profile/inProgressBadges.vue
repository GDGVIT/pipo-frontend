<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <LeftArrow name="leftArrow" class="absolute top-10 left-24" />
    </router-link>

    <!-- Intro -->
    <div class="text-center font-glight">
      <div class="text-2xl md:text-3xl font-gbold my-4">In Progress Badges</div>
      <div class="my-8">
        These are the badges you are currently striving for!
      </div>
    </div>
    <!-- Badges -->
    <div
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center overflow-y-auto h-2/3 gap-4"
    >
      <div
        class="grid place-items-center"
        v-for="(badge, index) in inProgress"
        :key="index"
      >
        <div v-if="badge?.badgeId" class="grid place-items-center">
          <router-link
            :to="{
              name: 'calendar',
              params: {
                challengeId: `${badge.badgeId}`,
              },
            }"
          >
            <img
              class="w-16 h-16"
              :src="badge?.identicon"
              alt="in-progress-badge-pic"
            />
          </router-link>
          <span class="font-gbold text-sm">{{ badge?.badgeName }}</span>
        </div>
        <div
          v-else
          class="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrow from "@/components/user/userIcons";
import { getUserBadges } from "../../../composables/badges";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "../../../composables/auth";

export default {
  components: { LeftArrow },
  setup() {
    const { loadInProgress, getInProgress } = getUserBadges();
    const { isLoggedIn } = setUser();
    const inProgress = ref([]);

    onMounted(() => {
      if (inProgress.value.length === 0)
        for (let i = 0; i < 15; i++) inProgress.value.push({});
    });

    const showInProgress = (inp) => {
      if (inp) {
        const len = inp.length > 15 ? inp.length : 15;
        console.log("inProgress", inProgress.value);
        for (let i = 0; i < len; i++)
          inProgress.value[i] = inp[i] ? inp[i] : {};
      }
    };

    watchEffect(async () => {
      if (isLoggedIn.value) {
        if (getInProgress.value.length === 0) await loadInProgress();
        showInProgress(getInProgress.value);
      }
    });

    return { inProgress };
  },
};
</script>

<style></style>
