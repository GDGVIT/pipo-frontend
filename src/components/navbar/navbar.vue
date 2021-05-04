<template>
  <div class="navbar">
    <div class="flex items-center">
      <!-- Logo -->
      <Icon name="pipoLogo" />

      <!-- Routes -->
      <div class="hidden xl:flex xl:items-center">
        <router-link class="mx-8 ml-16" to="/">Home</router-link>
        <router-link class="mx-8" to="/posts">My Posts</router-link>
        <router-link class="mx-8" to="/badges">Badges</router-link>
        <div>
          <button
            class="bg-myRed text-white ml-7 px-4 py-2 cursor-pointer hover:opacity-90 rounded-sm"
            @click="signOutUser"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <!-- Filter -->
      <Dropdown />

      <!-- Icons -->
      <div class="flex items-center xl:ml-16">
        <Icon name="challengesIcon" />
        <Icon name="notificationsIcon" />

        <!-- Profile pic -->
        <router-link to="/user/profile">
          <Icon v-if="!hasPhotoURL" name="profileIcon" />
          <img
            v-if="hasPhotoURL"
            class="w-12 h-12 rounded-full mx-4"
            :src="photoURL"
          />
        </router-link>
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
      <div class="flex flex-col mt-32 text-center">
        <div class="flex items-center transform translate-x-1/3 md:invisible">
          <Icon name="challengeIconSidebar" />
          <Icon name="notifyIconSidebar" />
        </div>
        <router-link class="my-14 text-xl font-glight" to="/">Home</router-link>
        <router-link class="my-14 text-xl font-glight" to="/posts"
          >My Posts</router-link
        >
        <router-link class="my-14 text-xl font-glight" to="/badge"
          >Badges</router-link
        >
        <div>
          <button
            class="bg-myRed text-white my-14 px-4 py-2 cursor-pointer hover:opacity-90 rounded-md"
            @click="signOutUser"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "./navbarSVG";
import Dropdown from "./dropdown";

import firebase from "firebase/app";
import "firebase/auth";

import { mapActions } from "vuex";

export default {
  name: "navbar",
  components: { Icon, Dropdown },
  data() {
    return {
      hasPhotoURL: false,
      photoURL: "",
      isToggle: false,
      showSideBar: false,
    };
  },
  mounted() {
    const photoURL = firebase.auth().currentUser.photoURL;
    if (photoURL) {
      this.hasPhotoURL = true;
      this.photoURL = photoURL;
    }
  },
  methods: {
    ...mapActions({
      signOut: "signOutUser",
      clearUser: "clearUser",
    }),
    async signOutUser() {
      await firebase.auth().signOut();
      this.signOut();
      this.clearUser();

      this.$router.replace("/login");
    },
    showUserProfile() {
      this.$router.replace("/user");
    },
  },
};
</script>
<style scoped></style>
