<template>
  <div class="px-10 py-5 h-full relative font-gbold">
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-8 left-10" />
    </router-link>
    <!-- intro -->
    <div>
      <div class="text-xl my-2 text-center">Calendar</div>
      <div v-if="badge" class="text-center">
        <div class="text-3xl text-myBlue">{{ badge.badgeName }}</div>
        <div
          class="bg-myRed px-2 py-1 text-white my-2 text-xs rounded-full w-40 mx-auto"
        >
          {{ badge.days }} Days Challenge
        </div>
      </div>
      <!-- message -->
      <div class="text-gray-700 text-center my-4">
        <div v-if="!daysRemaining">
          Yayy! 🎉 You have successfully completed this challenge
        </div>
        <div v-else>Almost there! keep working. You got this😁</div>
      </div>
    </div>
    <!-- Days -->
    <div class="h-72 sm:h-80 overflow-y-auto my-6">
      <div
        class="grid grid-cols-11 place-items-center break-all"
        v-for="(post, index) in streakPosts"
        :key="index"
      >
        <div
          class="w-7 h-7 rounded-full bg-myRed col-start-6 col-span-1 grid place-items-center text-white"
        >
          <Icon name="tick" />
        </div>
        <div
          :class="[
            index % 2 === 0
              ? 'col-start-7 col-span-5'
              : 'col-start-1 col-span-5 row-start-1',
            'px-6 py-6 w-11/12 rounded-md border-myBlue border-2',
          ]"
        >
          <div class="text-xs">Day {{ index + 1 }}</div>
          <div>{{ post.title }}</div>
        </div>
      </div>
    </div>
    <!-- Bottom -->
    <div
      class="grid sm:grid-cols-2 place-items-center gap-3 text-center text-white text-xs"
    >
      <div class="w-2/3 rounded-md text-myRed">
        Days Remaining : {{ daysRemaining }}
      </div>
      <div class="w-2/3 rounded-md text-myBlue">
        Current Streak Of the Challenge : {{ streakPosts?.length }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { postsOfAChallenge } from "../../../composables/calendar";
import { setUser } from "../../../composables/auth";

export default {
  components: { Icon },
  setup() {
    const route = useRoute();
    const badge = ref(null);
    const challengeId = route.params.challengeId;
    const {
      loadChallengePosts,
      badgeDetails,
      streakPosts,
      nonStreakPosts,
    } = postsOfAChallenge();
    const { isLoggedIn } = setUser();

    const daysRemaining = computed(() =>
      badge.value ? badge.value.days - streakPosts.value.length : 0
    );

    watchEffect(async () => {
      if (isLoggedIn.value) {
        // Get badge details
        console.log("challengeId being sent", challengeId);
        badge.value = await badgeDetails(challengeId);
        await loadChallengePosts(challengeId);
      }
    });

    return { streakPosts, nonStreakPosts, badge, daysRemaining };
  },
};
</script>

<style></style>
