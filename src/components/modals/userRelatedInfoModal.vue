<template>
  <div
    class="fixed bg-gray-50 p-14 h-full w-full z-30 top-0 bottom-0 left-0 right-0 md:m-auto font-glight overflow-y-auto"
  >
    <span
      @click="$emit('close')"
      class="absolute top-16 right-16 cursor-pointer"
    >
      <Icon name="close" />
    </span>

    <!-- What points mean? -->
    <div v-if="modal === 'pointsInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">About Points</div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">How to gain points?</div>
            <div class="text-sm">
              Points are obtained through upvotes on your posts. Spicy and crisp
              content means more upvotes. PiPo recommends you make posts which
              describes the journey of your challenge so far.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Why points?</div>
            <div class="text-sm">
              The posts of users with highest points will be shown in the home
              page. Hence, more upvotes and a greater influence.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Points and Badges</div>
            <div class="text-sm">
              Badges and Points are different. Badges are earned after
              completing a challenge on maintaining a streak for a certain
              number of days based on badge or challenge you're aiming to
              achieve.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Completed badges -->
    <div v-if="modal === 'completedBadgesInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">
          About Completed Badges
        </div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">
              How is completed badges different from in progress badges?
            </div>
            <div class="text-sm">
              Completed badges are the badges you earn after you complete the
              challenge. These are the badges that are shown when someone clicks
              on your profile.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../post/postSVG.vue";
export default {
  components: { Icon },
  props: ["modal"],
};
</script>

<style></style>
