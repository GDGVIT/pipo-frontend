<template>
  <div
    @click="$emit('close', null)"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80 "
  />
  <div
    class="aboutBadge sm:w-2/3 fixed bg-white px-2 sm:px-14 py-10 h-2/3 z-20 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-1/2 mx-auto lg:w-1/3 font-glight overflow-y-auto"
  >
    <!-- Close btn -->
    <div
      @click="$emit('close', null)"
      class="absolute top-12 right-12 cursor-pointer"
    >
      <Icon name="close" />
    </div>
    <div class="text-center grid gap-y-3">
      <div v-if="badge.identicon" class="grid place-items-center">
        <img
          class="w-32 h-32 rounded-full p-2 border-2"
          :src="badge.identicon"
          alt="badge pic"
        />
      </div>
      <div class="text-3xl font-gbold">{{ badge?.badgeName }}</div>
      <div>
        <span
          class="inline-block bg-myRed text-white text-xs px-2 py-1 font-gbold rounded-full"
          >{{ badge?.days }} days challenge</span
        >
      </div>
      <div
        :class="[
          badge?.hasChallenge
            ? 'text-myRed bg-red-100'
            : 'text-myBlue bg-blue-100',
          'font-gbold p-2 rounded-md text-sm',
        ]"
      >
        {{
          badge?.hasChallenge
            ? "Needs streak to be maintained 🔥"
            : "Doesn't require a streak to be maintained 🧊"
        }}
      </div>
      <div v-if="badge.badgeDescription" class="bg-gray-50 p-2 rounded-md">
        <div class="font-semibold py-2">🤔 About the Challenge</div>
        <div class="text-sm">
          {{ badge.badgeDescription }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import anime from "animejs/lib/anime.es.js";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["badge"],
  emits: ["close"],
  components: { Icon },
  setup() {
    onMounted(() => {
      anime({
        targets: ".aboutBadge",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
    });
  },
};
</script>

<style></style>
