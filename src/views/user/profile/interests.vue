<template>
  <div class="px-10 py-5 relative font-glight">
    <!-- Go back -->
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-2 sm:left-10" />
    </router-link>
    <!-- Introduction -->
    <div
      class="w-4/5 m-auto text-center flex justify-center items-center gap-x-4"
    >
      <div class="text-xl sm:text-2xl md:text-3xl font-gbold my-5">
        Interests
      </div>
      <div @click="showInterestsInfo = true">
        <Icon name="info" />
      </div>
    </div>
    <!-- Add your interest -->
    <div
      class="w-11/12 md:w-2/3 my-6 sm:my-10 relative m-auto"
      data-aos="fade-up"
    >
      <textarea
        class="shadow-md rounded-lg focus:outline-none resize-none p-5 w-full"
        cols="40"
        rows="2"
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
    <!-- Delete all -->
    <div class="absolute top-10 right-10" @click="deleteAllInterests()">
      <Popper :hover="true" placement="top">
        <button>
          <Icon name="bin" />
        </button>
        <template #content>
          <div
            class="w-32 font-glight text-xs bg-myBlue text-white p-2 break-normal rounded-md"
          >
            Delete all interests
          </div>
        </template>
      </Popper>
    </div>
    <!-- Display interests -->
    <div class="md:px-10 relative break-words max-h-72 overflow-y-auto">
      <!-- If no interests -->
      <div
        v-if="interestList.length === 0"
        class="md:w-2/3 m-auto mt-10 text-center"
        data-aos="zoom-in"
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
      >
        <div class="flex items-center justify-between">
          <span class="font-gbold">{{ interest }}</span>
          <span
            @click="deleteInterest(index)"
            class="ml-3 cursor-pointer text-xs"
            ><Icon name="close"
          /></span>
        </div>
      </div>
    </div>
  </div>
  <!-- Info on todo -->
  <InfoModal
    @close="showInterestsInfo = false"
    v-if="showInterestsInfo"
    modal="interestsInfo"
  />
</template>

<script>
import Icon from "@/components/user/userIcons";
import InfoModal from "@/components/modals/userRelatedInfoModal";
import { getInterests } from "@/composables/activities";
import { ref, watchEffect } from "vue";
import { setUser } from "@/composables/auth";
import { isBlank } from "@/composables/posts";

export default {
  components: { Icon, InfoModal },
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
    const showInterestsInfo = ref(false);

    const add = async () => {
      if (!isBlank(newInterest.value)) {
        await addInterests(newInterest.value);
        newInterest.value = "";
      }
    };

    const stopLoading = watchEffect(async () => {
      if (isLoggedIn.value && interestList.value.length === 0) {
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
      showInterestsInfo,
    };
  },
};
</script>

<style scoped></style>
