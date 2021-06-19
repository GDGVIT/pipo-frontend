<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-80 backdrop-filter backdrop-blur-3xl"
  />
  <div
    class="fixed bg-white p-14 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('close')"
      class="absolute top-16 right-16 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <!-- Instructions for add post -->
    <div v-if="modal === 'addPostInfo'">
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl">How to add a post?</div>
        <div class="grid gap-10 my-10">
          <div>
            <div class="font-gbold mb-3">Selecting a challenge</div>
            <div class="text-sm">
              Select a challenge from the dropdown. These are the list of
              challenges available. Earn a badge after completing each
              challenge. Until then the badge is in progress and can be seen in
              your profile.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Filling the box</div>
            <div class="text-sm">
              Give a catchy title and a short and crisp description of your
              progress for the day. Quality content has more upvotes otherwise.
              More upvotes mean more points. Accounts with higher points will be
              seen on top of the main page.
            </div>
          </div>
          <div>
            <div class="font-gbold mb-3">Images and Tags</div>
            <div class="text-sm">
              Spice it up by adding images and tags to your post. This is
              optional.
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
  emits: ["close"],
};
</script>

<style></style>
