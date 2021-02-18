<template>
  <loginPage />
</template>

<script>
import loginPage from "./components/loginPage";
export default {
  name: "App",
  components: {
    loginPage,
  },
};
</script>

<style>
@font-face {
  font-family: Gilroy;
  src: url("./components/fonts/Gilroy-Light.otf") format("opentype");
}
@font-face {
  font-family: Gilroy-Bold;
  font-weight: bold;
  src: url("./components/fonts/Gilroy-ExtraBold.otf") format("opentype");
}

#app {
  font-family: Gilroy;
}
</style>
