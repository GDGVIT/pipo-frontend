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
              number of days based on the badge or challenge you're aiming to
              achieve.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Completed badges -->
    <div v-else-if="modal === 'completedBadgesInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">
          About Completed Badges
        </div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">
              Completed Badges
            </div>
            <div class="text-sm">
              Completed badges are the badges which you have earned after
              maintaining a streak in that challenge. The streak here to be
              maintained to earn the badge depends on the challenge you're
              taking
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              How is completed badges different from in progress badges?
            </div>
            <div class="text-sm">
              Completed badges are the badges you earn after you complete the
              challenge. In progress badges are the badges yet to be earned.
              That is, you're still working on that challenge
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              How to check my progress on this badge?
            </div>
            <div class="text-sm">
              Simply click on the badge and you will redirected to the calendar
              which shows all the details regarding your progress so far.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- todolist -->
    <div v-else-if="modal === 'todoInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">
          About Todolist
        </div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">
              Todolist vs Interests
            </div>
            <div class="text-sm">
              Todolist is the list of tasks you wish to complete in the future
              whereas interests are your hobbies and things you are good at.
              Interests will be visible for others to see so that people who
              share the same passion as you can follow you and grow together
              with you
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              Is my todolist visible to others?
            </div>
            <div class="text-sm">
              No, you're todolist is not visible to others when they view your
              profile
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- interests -->
    <div v-else-if="modal === 'interestsInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">
          About Interests
        </div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">
              Interests
            </div>
            <div class="text-sm">
              Maybe you like gardening or surfing on ice like PiPo does. List
              down the things you like or have been working on in this section.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              Are my interests visible to others?
            </div>
            <div class="text-sm">
              Yes, you're interests are visible to others and others interests
              are visible to you. If you find a person who shares similar
              interests as you follow that person and work on challenges
              together.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- In Progress badges -->
    <div v-else-if="modal === 'inProgressInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">
          About In Progress Badges
        </div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">
              In Progress Badges
            </div>
            <div class="text-sm">
              In Progress badges are the badges which you are currently working
              on. A continous streak of certain number of days (depending on the
              badge) has to be maintained for a challenge to be completed. On
              completion the badge in in-progress badges becomes a completed
              badge and will be visible when others have a look at your profile
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              How is completed badges different from in progress badges?
            </div>
            <div class="text-sm">
              Completed badges are the badges you earn after you complete the
              challenge. In progress badges are the badges yet to be earned.
              That is, you're still working on that challenge
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">
              How to check my progress on this badge?
            </div>
            <div class="text-sm">
              Simply click on the badge and you will redirected to the calendar
              which shows all the details regarding your progress so far.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/post/postSVG.vue";
export default {
  components: { Icon },
  props: ["modal"],
};
</script>

<style></style>
