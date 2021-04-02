<template>
  <Navbar v-if="isAuthenticated" />
  <router-view />
</template>

<script>
import { mapState } from "vuex";
import Navbar from "../components/modules/navbar/navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },
  mounted() {
    console.log("Home Page", this.isAuthenticated);
    if (!this.isAuthenticated) {
      this.$router.replace("/login");
    }
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
</style>
