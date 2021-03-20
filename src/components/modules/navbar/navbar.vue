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
    </div>
    <div class="nav-icons">
      <NavbarSVG class="icon challenge" name="challengesIcon" />
      <NavbarSVG class="icon notification" name="notificationsIcon" />
      <NavbarSVG class="icon profile" name="profileIcon" />
      <NavbarSVG
        @click="toggleNav()"
        class="icon hamburger"
        name="hamburgerIcon"
      />
    </div>
  </div>
</template>
<script>
import NavbarSVG from "./navbarSVG";
import LoginSVG from "../login/loginSVG";
export default {
  name: "navbar",
  components: {
    NavbarSVG,
    LoginSVG,
  },
  data() {
    return {
      isToggle: false,
    };
  },
  methods: {
    toggleNav() {
      this.isToggle = !this.isToggle;
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
  z-index: 99;
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
  flex-basis: 30%;
  display: flex;
  justify-content: flex-end;
}

.icon {
  width: 30px;
  margin: 0 20px;
}

.hamburger {
  display: none;
}

@media only screen and (max-width: 800px) {
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
    background-color: #f3f3f3;
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
