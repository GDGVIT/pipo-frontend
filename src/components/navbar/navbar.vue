<template>
  <div class="navbar" ref="nav" v-click-outside="closeSideBar">
    <div class="flex items-center">
      <!-- Logo -->
      <router-link to="/login/#details">
        <Icon name="pipoLogo" />
      </router-link>

      <!-- Routes -->
      <div v-if="isLoggedIn" class="hidden xl:flex xl:items-center">
        <router-link class="mx-8 ml-16" to="/">Home</router-link>
        <router-link class="mx-8" to="/posts">My Posts</router-link>
        <router-link class="mx-8" to="/badges">Badges</router-link>
      </div>
    </div>

    <!-- Filter -->
    <Dropdown />

    <div class="flex items-center">
      <!-- Icons -->
      <!-- TODO: Do these later -->
      <div
        v-if="false"
        class="md:w-24 flex items-center justify-between md:ml-16 md:mr-3"
      >
        <Icon name="challengesIcon" />
        <Icon name="notificationsIcon" />
      </div>

      <!-- Profile pic -->
      <div class="hidden xl:block">
        <router-link to="/user/profile">
          <Icon v-if="!isLoggedIn" name="profileIcon" />
          <img
            v-if="isLoggedIn"
            class="w-12 h-12 rounded-full ml-4"
            :src="photo && photo"
            referrerpolicy="no-referrer"
          />
        </router-link>
      </div>

      <!-- Sign out -->
      <div class="hidden xl:block">
        <button
          class="text-myRed text-sm ml-7 pr-4 py-2 cursor-pointer hover:opacity-90 rounded-sm"
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
        'fixed h-screen xl:hidden -z-10 w-80 bg-white right-0 top-0 transform transition-all duration-500',
      ]"
    >
      <div class="flex flex-col mt-20 text-center">
        <!-- Profile pic -->
        <div class="grid place-items-center pt-4 pb-10">
          <router-link to="/user/profile">
            <Icon v-if="!isLoggedIn" name="profileIcon" />
            <img
              v-if="isLoggedIn"
              class="w-24 h-24 rounded-full ml-4"
              :src="photo && photo"
              referrerpolicy="no-referrer"
            />
          </router-link>
        </div>
        <!-- TODO: Do these later -->
        <div v-if="false" class="flex items-center justify-between w-24 m-auto">
          <DIcon name="challengesIcon" />
          <DIcon name="notificationsIcon" />
        </div>
        <router-link class="my-10 text-xl font-glight" to="/">Home</router-link>
        <router-link class="my-10 text-xl font-glight" to="/posts"
          >My Posts</router-link
        >
        <router-link class="my-10 text-xl font-glight" to="/badges"
          >Badges</router-link
        >
        <div>
          <button
            class="bg-myRed text-white my-14 px-4 py-2 cursor-pointer hover:opacity-90 rounded-md"
            @click="signOutUser()"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "./navIcons";
import DIcon from "./dropdownIcons";
import Dropdown from "./dropdown";

import firebase from "firebase/app";
import "firebase/auth";

import { setUser } from "../../composables/auth";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "navbar",
  components: { Icon, Dropdown, DIcon },
  setup() {
    const router = useRouter();
    const photo = ref(null);
    const showSideBar = ref(false);
    const isToggle = ref(false);

    const { isLoggedIn } = setUser();
    watchEffect(() => {
      if (isLoggedIn.value && !photo.value) {
        photo.value = firebase.auth()?.currentUser.photoURL;
      }
    });

    const signOutUser = async () => {
      await firebase.auth().signOut();
      console.log("User has been signed out!");
      await router.push("/login");
    };

    const closeSideBar = () => {
      if (showSideBar.value) showSideBar.value = false;
    };

    const goToProfile = async () => {
      if (isLoggedIn.value) await router.push("/user");
    };

    return {
      isLoggedIn,
      photo,
      closeSideBar,
      signOutUser,
      goToProfile,
      isToggle,
      showSideBar,
    };
  },
};
</script>
<style scoped></style>
