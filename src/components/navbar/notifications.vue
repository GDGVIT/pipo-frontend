<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-80 "
  />
  <div
    class="notificationsModal fixed bg-white p-8 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-3/5 md:m-auto lg:w-1/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('close')"
      class="absolute top-10 right-10 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <div class="font-gbold text-xl md:text-2xl">Notifications</div>
    <div class="mt-3 h-l2 overflow-y-auto">
      <!-- <div
        v-for="(message, index) in messages"
        :key="index"
        class="border-2 border-myBlue p-4 py-2 rounded-md my-4"
      >
        <div class="font-gbold">{{ message?.title }}</div>
        <div class="text-sm my-2">{{ message?.message }}</div>
        <div class="text-sm flex justify-end p-1 font-gbold text-white">
          <button class="bg-myBlue px-2 py-1 rounded-sm">Accept</button>
          <button class="ml-5 bg-myRed px-2 py-1 rounded-sm">Reject</button>
        </div>
      </div> -->
      <div
        class="grid place-items-center bg-red-50 text-myRed font-gbold p-10 h-full"
      >
        Coming soon !
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { onMounted } from "@vue/runtime-core";
import Icon from "@/components/navbar/navIcons";
import { notify } from "../../composables/notifications";

export default {
  emits: ["close"],
  components: { Icon },
  setup() {
    const { messages } = notify();

    onMounted(async () => {
      anime({
        targets: ".notificationsModal",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
    });

    return { messages };
  },
};
</script>

<style></style>
