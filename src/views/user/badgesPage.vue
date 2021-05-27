<template>
  <div
    class="absolute top-24 bg-white transform left-1/2 -translate-x-1/2 w-full md:w-4/5 xl:w-2/3 p-10 font-glight h-4/5"
  >
    <!-- Intro -->
    <div>
      <div class="font-gbold text-3xl mb-5">Badges</div>
      <div>
        These are all the badges PiPo can offer you🐧. More badges coming soon.
        Gotta catch em all!
      </div>
    </div>
    <!-- Post a badge btn -->
    <button
      class="absolute top-10 right-10 bg-myRed px-3 py-2 text-white font-gbold"
      @click="badgeModal = true"
    >
      Post A Badge +
    </button>
    <!-- Streak Badges -->
    <div>
      <div class="text-2xl font-gbold my-2">Streaks</div>
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 place-items-center h-36 overflow-auto pt-6"
      >
        <div
          v-for="badge in streakBadges"
          :key="badge.badgeId"
          class="grid place-items-center"
        >
          <img :src="badge.identicon" alt="badge-img" class="w-20 h-20" />
          <div class="text-center text-sm font-gbold">
            {{ badge.badgeName }}
          </div>
        </div>
      </div>
    </div>
    <!-- No Streak Badges -->
    <div>
      <div class="font-gbold text-2xl mt-3">No Streaks</div>
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 place-items-center h-36 overflow-auto"
      >
        <div
          v-for="badge in noStreakBadges"
          :key="badge.badgeId"
          class="grid place-items-center"
        >
          <img :src="badge.identicon" alt="badge-img" class="w-20 h-20" />
          <div class="text-center text-sm font-gbold">
            {{ badge.badgeName }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add a badge Modal -->
  <BadgeModal v-if="badgeModal" @close="badgeModal = false" />
</template>
<script>
import BadgeModal from "@/components/modals/addBadgeModal";
import { ref, watchEffect } from "vue";
import { getBadges } from "../../composables/badges";
import { setUser } from "../../composables/auth";

export default {
  components: { BadgeModal },
  setup() {
    const { isLoggedIn } = setUser();

    const streakBadges = ref([]);
    const noStreakBadges = ref([]);
    const badgeModal = ref(false);

    const { loadBadges, getStreakBadges, getNoStreakBadges } = getBadges();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        console.log("Logged in hence loading badges!");
        await loadBadges();
        streakBadges.value = getStreakBadges.value;
        noStreakBadges.value = getNoStreakBadges.value;

        console.log("Streakbadges", streakBadges.value);
        console.log("noStreakbadges", noStreakBadges.value);
      }
    });

    return { streakBadges, noStreakBadges, badgeModal };
  },
};
</script>
<style scoped></style>
