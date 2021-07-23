<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-10" />
    </router-link>

    <!-- Intro -->
    <div class="text-center font-glight">
      <div
        class="flex justify-center items-center text-2xl md:text-3xl font-gbold my-5"
      >
        <span>Completed Badges</span>
        <div class="mx-4" @click="showCompletedInfo = true">
          <Icon name="info" />
        </div>
      </div>
    </div>
    <!-- Badges -->
    <div
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center overflow-y-auto h-l2 gap-4"
    >
      <div v-for="(badge, index) in completed" :key="index">
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
              alt="earned-badge-pic"
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
  <!-- Info modal for completed badges -->
  <InfoModal
    @close="showCompletedInfo = false"
    v-if="showCompletedInfo"
    modal="completedBadgesInfo"
  />
</template>

<script>
import Icon from "@/components/user/userIcons";
import InfoModal from "@/components/modals/userRelatedInfoModal";
import { getUserBadges } from "@/composables/badges";
import { onMounted, ref, watchEffect } from "vue";
import { setUser } from "@/composables/auth";

export default {
  components: { Icon, InfoModal },
  setup() {
    const completed = ref([]);
    const { isLoggedIn } = setUser();
    const { loadCompleted, getCompleted } = getUserBadges();
    const showCompletedInfo = ref(false);

    onMounted(async () => {
      if (completed.value.length === 0)
        for (let i = 0; i < 15; i++) completed.value.push({});
    });

    const showCompleted = (cp) => {
      if (cp) {
        const len = cp.length > 15 ? cp.length : 15;
        for (let i = 0; i < len; i++) completed.value[i] = cp[i] ? cp[i] : {};
      }
    };

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadCompleted();
        showCompleted(getCompleted.value);
      }
    });

    return { completed, showCompletedInfo };
  },
};
</script>

<style></style>
