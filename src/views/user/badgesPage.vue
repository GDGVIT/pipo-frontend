<template>
  <!-- Confetti background -->
  <canvas id="confetti-holder" class="fixed top-0 w-full h-full -z-5" />
  <div
    class="absolute top-24 bg-white transform left-1/2 -translate-x-1/2 w-full md:w-4/5 xl:w-2/3 font-glight h-4/5"
  >
    <!-- Intro -->
    <div class="p-10 pb-4">
      <div class="font-gbold text-xl sm:text-2xl lg:text-3xl mb-5">
        Challenges
      </div>
      <div class="text-sm sm:text-base">
        These are all the challenges PiPo can offer you🐧. More challenges
        coming soon. At the end of each challenge you earn a badge. Gotta catch
        em all!
      </div>
    </div>
    <!-- Post a badge btn -->
    <button
      class="absolute text-sm sm:text-base top-10 right-10 bg-myRed px-3 py-2 text-white font-gbold"
      @click="badgeModal = true"
    >
      Post A Badge +
    </button>

    <div class="text-sm sm:text-base grid grid-cols-2 mt-2 place-items-center">
      <div
        @click="showMyBadges = true"
        :class="[
          showMyBadges ? 'border-b-2 border-myBlue' : '',
          'text-myBlue font-gbold py-2 cursor-pointer transition-all',
        ]"
      >
        My Challenges
      </div>
      <div
        @click="showMyBadges = false"
        :class="[
          !showMyBadges ? 'border-b-2 border-myBlue' : '',
          ,
          'text-myBlue font-gbold py-2 cursor-pointer transition-all whitespace-nowrap',
        ]"
      >
        Remaining Available
      </div>
    </div>

    <!-- My badges -->
    <div class="sm:px-10">
      <div class="h-72 overflow-y-auto overflow-x-hidden">
        <!-- My Badges -->
        <div
          v-if="showMyBadges"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 justify-items-center items-start"
        >
          <div
            @click="showBadge(badge)"
            v-for="(badge, index) in myBadges"
            :key="index"
            class="grid justify-items-center items-start cursor-pointer"
          >
            <img :src="badge.identicon" alt="badge-img" class="w-20 h-20" />
            <div class="text-center text-sm font-gbold">
              {{ badge.badgeName }}
            </div>
            <div class="text-xs rounded-full text-myBlue font-gbold px-2">
              {{ badge.days }} days
            </div>
          </div>
        </div>
        <!-- Available badges -->
        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 justify-items-center items-start"
        >
          <div
            @click="showBadge(badge)"
            v-for="(badge, index) in available"
            :key="index"
            class="grid justify-items-center items-start cursor-pointer"
          >
            <img :src="badge.identicon" alt="badge-img" class="w-20 h-20" />
            <div class="text-center text-base font-gbold my-2">
              {{ badge.badgeName }}
            </div>
            <div class="text-xs rounded-full text-myBlue font-gbold px-2">
              {{ badge.days }} days
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add a badge Modal -->
  <BadgeModal
    v-if="badgeModal"
    @close="badgeModal = false"
    @confetti="showConfetti = true"
  />

  <!-- Badge info modal -->
  <BadgeInfoModal
    v-if="showBadgeInfo"
    :badge="currentBadge"
    @close="showBadgeInfo = false"
  />
</template>
<script>
import BadgeInfoModal from "@/components/modals/aboutBadge";
import BadgeModal from "@/components/modals/addBadgeModal";
import { onBeforeUnmount, ref, watch, watchEffect } from "vue";
import { getBadges, getUserBadges } from "@/composables/badges";
import { setUser } from "@/composables/auth";
import ConfettiGenerator from "confetti-js";

export default {
  components: { BadgeInfoModal, BadgeModal },
  setup() {
    const { isLoggedIn } = setUser();
    const showMyBadges = ref(false);

    const myBadges = ref([]);
    const available = ref([]);

    const showBadgeInfo = ref(false);
    const currentBadge = ref(null);
    const badgeModal = ref(false);

    const { loadBadges, getAllBadges } = getBadges();
    const {
      loadInProgress,
      loadCompleted,
      getInProgress,
      getCompleted,
    } = getUserBadges();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadBadges();
        await loadInProgress();
        await loadCompleted();

        myBadges.value = getInProgress.value;

        getCompleted.value?.forEach((c) => {
          let found = false;
          myBadges.value?.forEach((m) => {
            if (c.badgeId === m.badgeId) found = true;
          });
          if (!found) myBadges.value.push(c);
        });

        available.value = getAllBadges.value?.filter((a) => {
          let found = false;
          myBadges.value?.forEach((m) => {
            if (a?.badgeId === m?.badgeId) found = true;
          });
          return !found;
        });
      }
    });

    // for showing badge
    const showBadge = (badge) => {
      currentBadge.value = badge;
      showBadgeInfo.value = true;
    };

    // For confetti showcase
    const showConfetti = ref(false);
    let confettiInterval = null;
    let confetti = null;
    const confettiSettings = {
      target: "confetti-holder",
      max: 150,
      rotate: true,
    };

    const runConfetti = () => {
      let time = 5;
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      confettiInterval = setInterval(() => {
        if (!time) {
          showConfetti.value = false;
          confetti.clear();
          clearInterval(confettiInterval);
        }
        time--;
      }, 1000);
    };

    watch(showConfetti, () => {
      if (showConfetti.value) {
        runConfetti();
      }
    });

    onBeforeUnmount(() => {
      if (confettiInterval) {
        clearInterval(confettiInterval);
        showConfetti.value = false;
      }
    });

    return {
      badgeModal,
      myBadges,
      available,
      showMyBadges,
      showBadgeInfo,
      showBadge,
      currentBadge,
      showConfetti,
    };
  },
};
</script>
<style scoped></style>
