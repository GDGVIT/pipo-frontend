<template>
  <!-- Confetti background -->
  <canvas id="confetti-holder" class="fixed top-0 w-full h-full -z-5" />
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

    <div class="grid grid-cols-2 mt-4 place-items-center">
      <div
        @click="showMyBadges = true"
        :class="[
          showMyBadges ? 'border-b-2 border-myBlue' : '',
          'text-myBlue font-gbold py-2 cursor-pointer transition-all',
        ]"
      >
        My Badges
      </div>
      <div
        @click="showMyBadges = false"
        :class="[
          !showMyBadges ? 'border-b-2 border-myBlue' : '',
          ,
          'text-myBlue font-gbold py-2 cursor-pointer transition-all',
        ]"
      >
        Remaining Available
      </div>
    </div>

    <!-- My badges -->
    <div>
      <div class="h-80 overflow-auto">
        <!-- My Badges -->
        <div
          v-if="showMyBadges"
          class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 justify-items-center items-start"
        >
          <div
            v-for="(badge, index) in myBadges"
            :key="index"
            class="grid justify-items-center items-start"
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
          class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 justify-items-center items-start"
        >
          <div
            v-for="(badge, index) in available"
            :key="index"
            class="grid justify-items-center items-start"
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
</template>
<script>
import BadgeModal from "@/components/modals/addBadgeModal";
import { onBeforeUnmount, ref, watch, watchEffect } from "vue";
import { getBadges, getUserBadges } from "@/composables/badges";
import { setUser } from "@/composables/auth";
import ConfettiGenerator from "confetti-js";

export default {
  components: { BadgeModal },
  setup() {
    const { isLoggedIn } = setUser();
    const showMyBadges = ref(true);

    const myBadges = ref([]);
    const available = ref([]);

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

        getCompleted.value.forEach((c) => {
          let found = false;
          myBadges.value.forEach((m) => {
            if (c.badgeId === m.badgeId) found = true;
          });
          if (!found) myBadges.value.push(c);
        });

        available.value = getAllBadges.value.filter((a) => {
          let found = false;
          myBadges.value.forEach((m) => {
            if (a?.badgeId === m?.badgeId) found = true;
          });
          return !found;
        });
      }
    });

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

    return { badgeModal, myBadges, available, showMyBadges, showConfetti };
  },
};
</script>
<style scoped></style>
