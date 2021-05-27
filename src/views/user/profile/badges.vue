<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <LeftArrow name="leftArrow" class="absolute top-10 left-24" />
    </router-link>

    <!-- Intro -->
    <div class="text-center font-glight">
      <div class="text-2xl md:text-3xl font-gbold my-4">Completed Badges</div>
      <div class="my-8">
        These are the badges you have achieved so far!. Flaunt them in front of
        your friends. You deserve these badges!
      </div>
    </div>
    <!-- Badges -->
    <div
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center overflow-y-auto h-2/3 gap-4"
    >
      <div
        class="grid place-items-center"
        v-for="(badge, index) in completed"
        :key="index"
      >
        <div v-if="badge?.badgeId">
          <img
            @click="this.$router.push(`/user/calendar/${badge.badgeName}`)"
            class="w-16 h-16"
            :src="badge?.identicon"
            alt="earned-badge-pic"
          />
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

export default {
  components: { LeftArrow },
  setup() {
    const completed = ref([]);
    const { loadCompleted, getCompleted } = getUserBadges();

    onMounted(() => {
      if (completed.value.length === 0)
        for (let i = 0; i < 15; i++) completed.value.push(null);
    });

    const showCompleted = (cp) => {
      if (cp) {
        const len = cp.length > 15 ? cp.length : 15;
        console.log("completed", completed.value);
        for (let i = 0; i < len; i++) completed.value[i] = cp[i] ? cp[i] : {};
      }
    };

    watchEffect(async () => {
      if (getCompleted.value.length === 0) await loadCompleted();
      showCompleted();
    });

    return { completed };
  },
};
</script>

<style></style>
