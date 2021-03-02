<template>
  <Navbar v-if="isAuthenticated" />
  <router-view />
</template>

<script>
import Navbar from "../components/modules/navbar/navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      isAuthenticated: true,
    };
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
