<template>
  <div
    class="grid grid-rows-5 sm:grid-rows-1 sm:grid-cols-3 lg:grid-cols-4 font-gbold overflow-y-auto overflow-x-hidden h-full"
  >
    <!-- Profile -->
    <div
      class="row-span-4 sm:row-span-1 sm:col-span-1 grid grid-rows-3 bg-myRed text-white py-10"
    >
      <!-- Profile pic -->
      <div class="grid place-items-center relative">
        <div
          @click="showPointsInfo = true"
          class="absolute top-2 left-5 border border-white rounded-full"
        >
          <router-link
            :to="{
              name: 'randomUserPosts',
              params: { userId: profile?.user?.userId },
            }"
          >
            <Icon name="leftArrow" />
          </router-link>
        </div>
        <div class="relative">
          <div v-if="profile?.user?.picture">
            <img
              class="w-32 h-32 rounded-full"
              :src="profile?.user?.picture"
              alt="profile-pic"
              referrerpolicy="no-referrer"
            />
          </div>
          <div v-if="!profile?.user?.picture">
            <Icon name="profileIcon" />
          </div>
          <div
            class="absolute top-2 right-0 bg-white text-myRed text-xs px-2 rounded-full"
          >
            {{ profile?.user?.points }} pts
          </div>
        </div>
      </div>
      <!-- Profile details -->
      <div class="flex flex-col items-center p-2">
        <div
          class="relative w-full text-2xl md:text-3xl font-gbold text-center my-2 mx-auto flex break-all"
        >
          <div class="w-40 mx-auto text-center break-words focus:outline-none">
            {{ profile?.user?.userName }}
          </div>
        </div>
        <div class="font-glight pt-3 pb-6 px-2 w-full break-all text-center">
          {{ profile?.user?.email }}
        </div>
        <div v-if="profile" class="mb-4">
          <button
            v-if="!isFollowing"
            @click="follow()"
            class="border-2 border-white px-4 py-1 font-gbold rounded-sm mr-2"
          >
            Follow
          </button>
          <div
            v-if="isFollowing"
            class="border-2 border-white inline-block px-4 py-1 font-gbold rounded-sm mr-2"
          >
            Following
          </div>
        </div>
        <div class="font-gbold grid gap-y-6 m-auto">
          <div class="grid grid-cols-2 place-items-center">
            <div>Followers</div>
            <div
              class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs"
            >
              {{ profile?.followers }}
            </div>
          </div>

          <div class="grid grid-cols-2 place-items-center">
            <div>Following</div>
            <div
              class="bg-white text-myRed px-2 rounded-full ml-5 my-3 text-xs"
            >
              {{ profile?.following }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Collection Display -->
    <div
      class="row-span-1 sm:row-span-1 sm:col-span-2 lg:col-span-3 sm:overflow-y-auto font-glight px-5 md:px-10 pt-10"
    >
      <!-- Badges -->
      <div class="ml-5">
        <div class="py-3 font-gbold text-lg">
          Badges Earned
        </div>
        <div
          v-if="completed?.length === 0"
          class="p-10 bg-red-50 text-myRed font-gbold rounded-md my-5 mb-10"
        >
          Looks like this user has not earned any badges so far 🤔 but you can!.
          <router-link :to="{ name: 'myPosts' }">
            <u>Add a post today!</u>
          </router-link>
          😁
        </div>
        <div
          v-else
          class="grid grid-cols-3 gap-3 lg:grid-cols-6 justify-items-center items-center mt-5 mb-10"
        >
          <div
            v-for="(badge, index) in completed"
            :key="index"
            class="w-20 grid place-items-center"
          >
            <div v-if="badge" class="grid place-items-center">
              <img :src="badge?.identicon" alt="badge-pic" class="w-16 h-16" />
              <span class="text-xs font-gbold">{{ badge?.badgeName }}</span>
            </div>
            <div
              v-else
              class="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Interests -->
      <div class="ml-5 pt-6 overflow-x-hidden">
        <div class="py-3 font-gbold text-lg">Interests</div>
        <div
          v-if="profile?.user?.tags.length === 0"
          class="p-10 py-4 bg-red-50 text-myRed font-gbold rounded-md my-5 mb-10"
        >
          This user hasn't specified their interests 😕
        </div>
        <div v-else class="pt-5 pb-10">
          <div
            v-for="(interest, index) in profile?.user?.tags"
            :key="index"
            class="text-myRed border-2 border-myRed font-gbold text-sm rounded-md inline-block px-2 py-1 mr-2 my-1"
          >
            {{ interest }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { ref, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { setUser } from "@/composables/auth";
import { socialCircle } from "@/composables/profile";
import { getUserBadges } from "@/composables/badges";

export default {
  components: { Icon },
  setup() {
    const route = useRoute();
    const completedBadges = ref([]);
    const { isLoggedIn } = setUser();
    const {
      followThisPerson,
      getRandomUserProfile,
      randomUserDetails,
    } = socialCircle();
    const { loadCompletedOfRandomUser, getCompletedOfRandom } = getUserBadges();
    const isFollowing = ref(false);
    const completed = ref([]);

    const profile = ref(null);

    watchEffect(async () => {
      if (route.params.userId && isLoggedIn.value) {
        await getRandomUserProfile(route.params.userId);
        await loadCompletedOfRandomUser(route.params.userId);
        profile.value = randomUserDetails.value;
        completedBadges.value = getCompletedOfRandom.value;

        // console.log("Completed badges of random user", completedBadges.value);
        if (profile.value?.amIFollowing) {
          isFollowing.value = profile.value.amIFollowing;
        }
      }
    });

    const follow = async () => {
      const userId = route.params.userId;
      const result = await followThisPerson(userId);
      if (result === 0) isFollowing.value = true;
    };

    return { completed, follow, profile, isFollowing };
  },
};
</script>

<style></style>
