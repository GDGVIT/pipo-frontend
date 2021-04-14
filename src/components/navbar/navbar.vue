<template>
  <div class="navbar">
    <!-- Pipo logo -->
    <LoginSVG name="pipoLogo" class="w-28 mx-10" />

    <div class="routes" :class="{ open: isToggle }">
      <div :class="{ fade: isToggle }">
        <router-link to="/">Home</router-link>
      </div>
      <div :class="{ fade: isToggle }">
        <router-link to="/posts">My Posts</router-link>
      </div>
      <div :class="{ fade: isToggle }">
        <router-link to="/badge">Badges</router-link>
      </div>
      <div :class="{ fade: isToggle }">
        <button
          class="bg-myRed text-white px-4 py-2 cursor-pointer hover:opacity-90"
          @click="signOutUser"
        >
          Sign Out
        </button>
      </div>
    </div>
    <div class="flex justify-items-end">
      <NavbarSVG class="icon challenge" name="challengesIcon" />
      <NavbarSVG class="icon notification" name="notificationsIcon" />
      <NavbarSVG
        @click="showUserProfile"
        v-if="!hasPhotoURL"
        name="profileIcon"
        class="w-12 h-12 rounded-full object-cover mx-3"
      />
      <img
        v-if="hasPhotoURL"
        @click="showUserProfile"
        :src="photoURL"
        alt="profile-pic"
        class="w-12 h-12 rounded-full object-cover mx-3"
      />
      <NavbarSVG @click="setNav" class="icon hamburger" name="hamburgerIcon" />
    </div>
  </div>
</template>
<script>
import NavbarSVG from "./navbarSVG";
import LoginSVG from "../login/loginSVG";

import firebase from "firebase/app";
import "firebase/auth";

import { mapState, mapActions } from "vuex";

export default {
  name: "navbar",
  components: {
    NavbarSVG,
    LoginSVG,
  },
  computed: {
    ...mapState({
      isToggle: (state) => state.nav.navbarShow,
    }),
  },
  data() {
    return {
      hasPhotoURL: false,
      photoURL: "",
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
      show: "showNavbar",
      hide: "hideNavbar",
    }),
    setNav() {
      if (this.isToggle === true) this.hide();
      else this.show();
    },
    signOutUser() {
      firebase.auth().signOut();
      this.signOut();
      this.$router.replace("/login");
    },
    showUserProfile() {
      this.$router.replace("/user");
    },
  },
};
</script>
<style scoped>
.icon {
  width: 30px;
  margin: 0 20px;
}

.hamburger {
  display: none;
}

.routes {
  display: flex;
  justify-items: flex-end;
  align-items: center;
}

.routes > div {
  margin: 0 40px;
}

@media only screen and (max-width: 960px) {
  .hamburger {
    display: inline-block;
    cursor: pointer;
  }
  .routes {
    position: fixed;
    right: 0;
    top: 60px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    clip-path: circle(100px at 80% -10%);
    -webkit-clip-path: circle(100px at 150% -10%);
    transition: all 1s ease-out;
    pointer-events: none;
    background-color: white;
  }

  .routes.open {
    clip-path: circle(1000px at 90% -10%);
    -webkit-clip-path: circle(1000px at 90% -10%);
    pointer-events: all;
  }
  .nav:nth-child(1) {
    transition: all 0.5s ease 0.2s;
  }
  .nav:nth-child(2) {
    transition: all 0.5s ease 0.4s;
  }
  .nav:nth-child(3) {
    transition: all 0.5s ease 0.6s;
  }
  nav.fade {
    opacity: 1;
  }
}
</style>
