<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 "
  />
  <div
    class="addBadgeModal fixed bg-white px-14 py-10 h-4/5 z-20 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-1/3 font-glight"
  >
    <!-- Close btn -->
    <div
      @click="$emit('close', null)"
      class="absolute top-12 right-12 cursor-pointer"
    >
      <Icon name="close" />
    </div>

    <!-- Intro -->
    <div class="font-gbold text-center text-2xl mb-2">Add A Badge</div>
    <div class="text-center text-sm text-myRed">
      Only admins can post new badges
    </div>
    <div
      v-if="user?.isAdmin"
      class="bg-green-200 text-green-500 font-gbold rounded-md my-4 p-2 text-center"
    >
      You are an admin
    </div>
    <div
      v-else
      class="bg-red-200 text-red-400 font-gbold rounded-md my-4 p-2 text-center"
    >
      You're not an admin
    </div>

    <!-- Badge details -->
    <div class="grid gap-3 mt-4">
      <div>Badge Name</div>
      <input
        type="text"
        v-model="badgeName"
        class="bg-gray-50 px-5 py-2 w-full text-sm"
        placeholder="Enter badge Name..."
      />
      <div>Number Of Days</div>
      <input
        type="text"
        v-model="badgeDays"
        class="bg-gray-50 px-5 py-2 w-full text-sm"
        placeholder="Days the challenge would last"
      />
      <div>Does it have a streak?</div>
      <div class="grid grid-cols-4 place-items-center">
        <label for="streak">Streak</label>
        <input
          type="radio"
          v-model="badgeHasStreak"
          name="streak"
          :value="true"
        />
        <label for="streak">No Streak</label>
        <input
          type="radio"
          v-model="badgeHasStreak"
          name="streak"
          :value="false"
        />
      </div>
      <div>
        Badge Image Url
        <span class="text-xs text-gray-400">(optional)</span>
      </div>
      <input
        type="text"
        v-model="badgeImageUrl"
        class="bg-gray-50 px-5 py-2 w-full text-sm"
        placeholder="Badge Image URL"
      />
    </div>
    <div class="text-center mt-7">
      <button
        @click="submitBadge"
        class="bg-myRed px-3 py-2 text-white font-gbold"
      >
        Post Badge
      </button>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { onMounted, ref, watch } from "vue";
import { getBadges } from "@/composables/badges";
import { setUser } from "@/composables/auth";
import { useToast } from "vue-toastification";
import Icon from "@/components/user/userIcons";

export default {
  components: { Icon },
  emits: ["close", "confetti"],
  setup(props, { emit }) {
    const badgeName = ref(null);
    const badgeDays = ref(null);
    const badgeHasStreak = ref(false);
    const badgeImageUrl = ref(null);
    const alert = ref(null);
    const toast = useToast();

    const { postBadge } = getBadges();
    const { isLoggedIn, user } = setUser();

    watch(alert, () => {
      toast.error(alert.value);
    });

    onMounted(() => {
      anime({
        targets: ".addBadgeModal",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
    });

    const submitBadge = async () => {
      // TODO: Change this later from 25 to 1

      const data = {
        badgeName: badgeName.value,
        days: parseInt(badgeDays.value),
        badgeImgUrl: badgeImageUrl.value,
        hasChallenge: badgeHasStreak.value,
        upvotes: 25,
      };

      if (user.value?.isAdmin) {
        if (isLoggedIn.value) {
          const res = await postBadge(data);
          console.log("Response on adding badge", res);
          if (res === 0) {
            emit("confetti", null);
            emit("close", null);
          }
        } else {
          alert.value = "Not Logged in!";
        }
      } else {
        alert.value = "You're not an admin!";
      }
    };

    return {
      badgeName,
      badgeDays,
      badgeHasStreak,
      badgeImageUrl,
      submitBadge,
      user,
    };
  },
};
</script>

<style></style>
