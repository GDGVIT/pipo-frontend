<template>
  <Background name="darkBg" />
  <Navbar v-if="enableNavbar" />
  <router-view />
</template>

<script>
import Background from "../components/modules/backgrounds/bgSVG";
import firebase from "firebase/app";
import "firebase/auth";
import Navbar from "../components/modules/navbar/navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
    Background,
  },
  data() {
    return {
      enableNavbar: false,
    };
  },
  methods: {
    ...mapActions({
      authenticate: "authenticateUser",
    }),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.enableNavbar = true;
        user.getIdToken().then((idToken) => {
          console.log(idToken);
          this.authenticate(idToken);
          this.$router.replace("/");
        });
      } else {
        this.$router.replace("/login");
      }
    });
  },
};
</script>

<style>
@font-face {
  font-family: Gilroy;
  src: url("../../fonts/Gilroy-Light.otf") format("opentype");
}
@font-face {
  font-family: Gilroy-Bold;
  font-weight: bold;
  src: url("../../fonts/Gilroy-ExtraBold.otf") format("opentype");
}

#app {
  font-family: Gilroy;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

.user-container {
  position: fixed;
  width: 80%;
  height: 80vh;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 3;
  padding: 30px;
  box-sizing: border-box;
}
</style>
