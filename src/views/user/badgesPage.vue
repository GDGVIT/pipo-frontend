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
    <!-- My badges -->
    <div>
      <div class="text-xl text-myBlue font-gbold mt-4">
        My Badges
      </div>
      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 place-items-center h-36 overflow-auto"
      >
        <div
          v-for="badge in myBadges"
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
    <!-- Available -->
    <div>
      <div class="text-xl text-myBlue font-gbold mt-4">Available</div>

      <div
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 place-items-center h-36 overflow-auto"
      >
        <div
          v-for="badge in available"
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
import { getBadges, getUserBadges } from "../../composables/badges";
import { setUser } from "../../composables/auth";

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

    return { badgeModal, myBadges, available, showMyBadges };
  },
};
</script>
<style scoped></style>
