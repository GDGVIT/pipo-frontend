<template>
  <div class="px-10 py-5 h-full relative">
    <router-link to="/user/profile">
      <Icon name="leftArrow" class="absolute top-10 left-10" />
    </router-link>
    <div class="text-center font-glight">
      <div class="text-2xl md:text-3xl font-gbold my-4">Following</div>
      <div class="my-6">
        Here are the list of people you are following. Click on any one of them
        and you will be redirected to their page
      </div>
      <!-- Display followers -->
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-16 gap-6"
      >
        <div v-for="(people, index) in followingPeople" :key="index">
          <router-link
            :to="{
              name: 'randomUserPosts',
              params: { userId: people?.userId },
            }"
          >
            <div
              class="grid place-items-center p-2 border-2 border-myBlue rounded-md"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div class="relative">
                <img
                  :src="people?.picture"
                  alt="profile-pic"
                  class="rounded-full"
                  referrerpolicy="no-referrer"
                />
                <span
                  class="absolute top-2 -right-2 bg-myRed text-white rounded-full font-gbold px-2 text-xs"
                  >{{ people?.points }} pts</span
                >
              </div>
              <div class="font-gbold my-2">
                {{ people?.userName }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/user/userIcons";
import { watchEffect } from "@vue/runtime-core";
import { setUser } from "../../../composables/auth";
import { socialCircle } from "../../../composables/profile";
export default {
  components: { Icon },
  setup() {
    const { isLoggedIn } = setUser();
    const { loadFollowing, social } = socialCircle();
    const { followingPeople } = social();

    watchEffect(async () => {
      if (isLoggedIn.value) {
        await loadFollowing();
      }
    });

    return { followingPeople };
  },
};
</script>

<style></style>
