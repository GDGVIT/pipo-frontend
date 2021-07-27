<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 z-40 bg-black opacity-80 " />
  <div
    class="aboutBadge sm:w-2/3 z-50 fixed bg-white px-10 sm:px-14 py-10 h-2/3 xl:h-1/2 top-28 left-0 right-0 sm:left-10 sm:right-10 lg:w-1/2 mx-auto font-glight overflow-y-auto"
  >
    <div>
      <div class="text-xl font-gbold py-3">You have lost the streak</div>
      <div>
        Seems like you have lost the streak of this challenge 😔. Two options
        for you, either give up
        <span class="text-myRed font-gbold">{{ giveUpPoints }} points</span> to
        continue or restart again. Don't worry your posts will still remain on
        restarting the challenge
      </div>
      <div class="grid xl:grid-cols-2 gap-y-5 place-items-center mt-6">
        <div>
          <button
            @click="giveUpPts()"
            class="bg-blue-100 text-myBlue font-gbold p-3 rounded-md"
          >
            Give up {{ giveUpPoints }} points
          </button>
        </div>
        <div>
          <button
            @click="startOver()"
            class="bg-red-50 text-myRed font-gbold p-3 rounded-md"
          >
            Start the challenge again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { onMounted } from "@vue/runtime-core";
import { addPost } from "../../composables/posts";
import { useToast } from "vue-toastification";
export default {
  emits: ["close"],
  setup(props, { emit }) {
    const giveUpPoints = 10;
    const toast = useToast();
    const { restartPost, usePoints } = addPost();

    onMounted(() => {
      anime({
        targets: ".aboutBadge",
        scale: ["0", "1"],
        duration: 500,
        easing: "easeOutCubic",
      });
    });

    const giveUpPts = async () => {
      // console.log("Giving up 10 points");
      const res = await usePoints();
      if (res === 0) {
        toast.success(
          "Yayy! another day another post!🥳. Refresh the page to see the changes!"
        );
        emit("confetti", null);
      } else {
        toast.error(
          "Error updating the information to our servers please try again😓"
        );
      }
      emit("close", null);
    };

    const startOver = async () => {
      // console.log("Start Over");
      const res = await restartPost();
      if (res === 0) {
        toast.success(
          "Yayy! another day another post!🥳. Refresh the page to see the changes!"
        );
        emit("confetti", null);
      } else {
        toast.error(
          "Error updating the information to our servers please try again😓"
        );
      }
      emit("close", null);
    };

    return { giveUpPoints, giveUpPts, startOver };
  },
};
</script>

<style></style>
