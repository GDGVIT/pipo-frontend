<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
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
</style>
