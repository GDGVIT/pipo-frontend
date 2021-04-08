<template>
  <div class="navbar-container">
    <!-- Pipo logo -->
    <LoginSVG name="pipoLogo" class="logo" />
    <div class="routes" :class="{ open: isToggle }">
      <div class="nav" :class="{ fade: isToggle }">
        <router-link to="/">Home</router-link>
      </div>
      <div class="nav" :class="{ fade: isToggle }">My Posts</div>
      <div class="nav" :class="{ fade: isToggle }">
        <router-link to="/badge">Badges</router-link>
      </div>
      <div class="nav" :class="{ fade: isToggle }">
        <button class="sign-out-btn" @click="signOutUser">Sign Out</button>
      </div>
    </div>
    <div class="nav-icons">
      <NavbarSVG class="icon challenge" name="challengesIcon" />
      <NavbarSVG class="icon notification" name="notificationsIcon" />
      <NavbarSVG
        @click="showUserProfile"
        v-if="!hasPhotoURL"
        class="profile-pic"
        name="profileIcon"
      />
      <img
        v-if="hasPhotoURL"
        @click="showUserProfile"
        :src="photoURL"
        alt="profile-pic"
        class="profile-pic"
      />
      <NavbarSVG
        @click="toggleNav"
        class="icon hamburger"
        name="hamburgerIcon"
      />
    </div>
  </div>
</template>
<script>
import NavbarSVG from "./navbarSVG";
import LoginSVG from "../login/loginSVG";
import firebase from "firebase/app";
import { mapActions } from "vuex";
import "firebase/auth";

export default {
  name: "navbar",
  components: {
    NavbarSVG,
    LoginSVG,
  },
  data() {
    return {
      isToggle: false,
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
    }),
    toggleNav() {
      this.isToggle = !this.isToggle;
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
.navbar-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Gilroy-Bold;
  background-color: white;
  box-shadow: 0 0 25px 0 black;
  z-index: 1;
}

.profile-pic {
  width: 40px;
  border-radius: 50%;
  margin: 0 15px;
}

.profile-pic:hover {
  cursor: pointer;
}

.logo {
  width: 120px;
  margin-left: 20px;
}

.nav {
  display: inline;
  margin: 0 40px;
}

.nav-icons {
  flex-basis: 20%;
  display: flex;
  justify-content: flex-end;
}

.sign-out-btn {
  background: #ff4242;
  color: white;
  border: none;
  padding: 10px 15px;
  font-family: Gilroy-Bold !important;
  outline: none;
}

.sign-out-btn:hover {
  cursor: pointer;
  opacity: 0.9;
}

.icon {
  width: 30px;
  margin: 0 20px;
}

.hamburger {
  display: none;
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
    background-color: #fffbfb;
  }

  .nav {
    text-align: center;
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
