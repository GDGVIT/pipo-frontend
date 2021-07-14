<template>
  <div class="navbar" ref="nav" v-click-outside="closeSideBar">
    <div class="flex items-center">
      <!-- Logo -->
      <router-link :to="{ name: $route.name !== 'home' ? 'home' : 'login' }">
        <Icon name="pipoLogo" />
      </router-link>

      <!-- Routes -->
      <div
        v-if="isLoggedIn"
        class="hidden xl:ml-8 xl:grid xl:grid-cols-4 xl:place-items-center xl:gap-x-10"
      >
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'generalPosts' }">Leaderboard</router-link>
        <router-link class="whitespace-nowrap" :to="{ name: 'myPosts' }"
          >My Posts</router-link
        >
        <router-link :to="{ name: 'badges' }">Badges</router-link>
      </div>
    </div>

    <!-- Filter -->
    <Dropdown />

    <div class="flex items-center">
      <!-- Notifications -->
      <div @click="showNotifications = true" class="hidden xl:block pr-4">
        <Icon name="notificationsIcon" />
      </div>
      <Notifications
        v-if="showNotifications"
        @close="showNotifications = false"
      />

      <!-- Profile pic -->
      <div class="hidden xl:block w-12 h-12">
        <router-link :to="{ name: 'userProfile' }">
          <div class="ml-4">
            <Icon v-if="!isLoggedIn" name="profileIcon" />
          </div>
          <img
            v-if="isLoggedIn && photo"
            class="w-12 h-12 rounded-full ml-4"
            :src="photo"
            referrerpolicy="no-referrer"
          />
        </router-link>
      </div>

      <!-- Sign out -->
      <div class="hidden xl:block">
        <button
          class="text-myRed text-sm ml-7 pr-4 py-2 cursor-pointer hover:opacity-90 rounded-sm whitespace-nowrap"
          @click="signOutUser()"
        >
          Sign Out
        </button>
      </div>

      <!-- Hamburger -->
      <Icon
        name="hamburger"
        :open="showSideBar"
        @show="showSideBar = !showSideBar"
      />
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        showSideBar ? '' : 'translate-x-full',
        'fixed h-screen xl:hidden -z-10 w-80 bg-white right-0 top-0 transform transition-all duration-500 overflow-y-auto',
      ]"
    >
      <div class="mt-20 mb-5">
        <!-- Profile pic -->
        <div class="grid place-items-center pt-4 pb-10">
          <router-link :to="{ name: 'userProfile' }">
            <div class="relative">
              <div class="ml-4">
                <Icon v-if="!isLoggedIn" name="profileIcon" />
              </div>
              <img
                v-if="isLoggedIn && photo"
                class="w-24 h-24 rounded-full ml-4"
                :src="photo"
                referrerpolicy="no-referrer"
              />
              <div
                @click="showNotifications = true"
                class="absolute -top-6 -right-24 rounded-full bg-gray-100 p-1 border border-black"
              >
                <Icon name="notificationsIcon" />
              </div>
            </div>
          </router-link>
        </div>
        <div
          class="grid grid-rows-5 mt-5 font-glight text-lg gap-y-14 place-items-center"
        >
          <router-link :to="{ name: 'home' }">Home</router-link>
          <router-link :to="{ name: 'generalPosts' }">Leaderboard</router-link>
          <router-link :to="{ name: 'myPosts' }">My Posts</router-link>
          <router-link :to="{ name: 'badges' }">Badges</router-link>
          <div>
            <button
              class="bg-myRed text-white font-gbold text-base px-4 py-2 cursor-pointer hover:opacity-90 rounded-md"
              @click="signOutUser()"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "./navIcons";
import Dropdown from "./dropdown";

import firebase from "firebase/app";
import "firebase/auth";

import Notifications from "@/components/navbar/notifications";
import { setUser } from "@/composables/auth";
import { notify } from "@/composables/notifications";
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { Icon, Dropdown, Notifications },
  setup() {
    const { isLoggedIn, user } = setUser();

    const router = useRouter();
    const route = useRoute();
    const photo = ref(null);
    const showSideBar = ref(false);
    const isToggle = ref(false);
    const showNotifications = ref(false);

    //notifications part
    const { requestPermission } = notify();

    watchEffect(() => {
      if (isLoggedIn.value) {
        if (!photo.value) photo.value = user.value.picture;
        requestPermission();
      }
    });

    const signOutUser = async () => {
      await firebase.auth().signOut();
      await router.push("/login");
    };

    const closeSideBar = () => {
      if (showSideBar.value) showSideBar.value = false;
    };

    const goToProfile = async () => {
      if (isLoggedIn.value) await router.push("/user");
    };

    watch(
      () => route.name,
      () => (showSideBar.value = false)
    );

    return {
      isLoggedIn,
      photo,
      closeSideBar,
      signOutUser,
      goToProfile,
      isToggle,
      showSideBar,
      showNotifications,
    };
  },
};
</script>
<style scoped></style>
