<template>
  <div class="px-10 py-5 h-full relative">
    <!-- Go back -->
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-10" />
    </router-link>
    <div class="font-glight">
      <!-- Introduction -->
      <div class="w-4/5 m-auto text-center">
        <div class="text-3xl font-gbold my-5">Interests</div>
        <div class="text-lg">
          Identify your interests and list them down here.
        </div>
      </div>
      <!-- Add your interest -->
      <div class="w-11/12 md:w-2/3 my-7 relative m-auto" data-aos="fade-up">
        <textarea
          class="shadow-md rounded-lg focus:outline-none resize-none p-5 w-full"
          cols="40"
          rows="3"
          placeholder="Enter your interest here.."
          v-model="newInterest"
          @keydown.enter="add()"
        ></textarea>
        <div
          @click="add()"
          class="absolute -bottom-3 right-6 w-10 h-10 bg-myRed grid place-items-center rounded-full text-white cursor-pointer"
        >
          <Icon name="plus" />
        </div>
      </div>
      <!-- Display interests -->
      <div class="px-10 relative break-words">
        <!-- Delete all -->
        <div class="absolute top-0 right-0" @click="deleteAllInterests()">
          <Icon name="bin" />
        </div>

        <!-- If no interests -->
        <div
          v-if="interestList.length === 0"
          class="md:w-2/3 m-auto mt-10 text-center"
          data-aos="fade-up"
        >
          No interests as of now.😭 Why not type some, it helps you connect with
          people 🧑 who share the same passion 🔥 as you. Keep it minimal and
          concise
        </div>
        <!-- If interests present -->
        <div
          v-else
          class="inline-block bg-myRed text-white mr-3 rounded-md px-3 py-1 my-1"
          v-for="(interest, index) in interestList"
          :key="index"
          data-aos="zoom-in"
        >
          <div class="flex items-center justify-between">
            <span class="font-gbold">{{ interest }}</span>
            <span
              @click="deleteInterest(index)"
              class="ml-3 cursor-pointer text-xs"
              >x</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { getInterests } from "../../../composables/activities";
import { ref, watchEffect } from "vue";
import { setUser } from "../../../composables/auth";

export default {
  components: { Icon },
  emits: ["click"],
  setup() {
    const newInterest = ref("");
    const { isLoggedIn } = setUser();
    const {
      loadInterests,
      addInterests,
      deleteInterest,
      deleteAllInterests,
      interestList,
    } = getInterests();

    const add = async () => {
      console.log("Add function called");
      await addInterests(newInterest.value);
      newInterest.value = "";
    };

    const stopLoading = watchEffect(async () => {
      if (isLoggedIn.value && interestList.value.length === 0) {
        console.log("Loading interests");
        await loadInterests();
        stopLoading();
      }
    });

    return {
      newInterest,
      add,
      deleteInterest,
      deleteAllInterests,
      interestList,
    };
  },
};
</script>

<style></style>
