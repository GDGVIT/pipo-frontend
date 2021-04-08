<template>
  <Background name="darkBg" />
  <div class="user-container">
    <router-view></router-view>
  </div>
</template>

<script>
import Background from "../components/modules/backgrounds/bgSVG";
export default {
  components: {
    Background,
  },
};
</script>

<style></style>
