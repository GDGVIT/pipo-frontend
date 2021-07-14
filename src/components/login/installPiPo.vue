<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-20 "
  />
  <div
    class="installPiPo fixed bg-white p-14 h-4/5 z-30 top-28 left-0 right-0 sm:left-10 sm:right-10 md:w-4/5 md:m-auto lg:w-2/3 font-glight overflow-y-auto"
  >
    <span
      @click="$emit('close')"
      class="absolute top-16 right-8 cursor-pointer"
    >
      <Icon name="close" />
    </span>
    <!-- Install PiPo -->
    <div>
      <div class="overflow-y-auto overflow-x-hidden">
        <div class="font-gbold text-2xl md:text-3xl text-center">
          Installing PiPo✨
        </div>
        <div class="grid gap-10 my-8">
          <div>
            <div class="text-xl text-center">
              Heya user! PiPo is now an installable app 🎉
            </div>
            <div class="mt-10">
              <div class="font-gbold text-lg text-myBlue">
                For Android devices
              </div>
              <ol class="mt-2">
                <li>1. On your Android device, open Chrome .</li>
                <li>2. Go to a website you want to install.</li>
                <li>3. Tap Add to home screen.</li>
                <li>4. Follow the onscreen instructions to install.</li>
              </ol>
            </div>
            <div class="mt-6">
              <div class="font-gbold text-lg text-myBlue">For PC</div>
              <div class="mt-2">
                <div>1. On your computer, open Chrome.</div>
                <div>2. Go to a website you want to install.</div>
                <div>
                  3. At the top right of the address bar, click Install .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/post/postSVG.vue";
import anime from "animejs/lib/anime.es";
import { onMounted } from "@vue/runtime-core";

export default {
  emits: ["close"],
  components: { Icon },
  setup() {
    onMounted(() => {
      anime({
        targets: ".installPiPo",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
    });
  },
};
</script>

<style></style>
