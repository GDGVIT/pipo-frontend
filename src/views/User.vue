<template>
  <Background name="darkBg" />
  <Navbar />
  <router-view />
</template>

<script>
import Background from "@/components/backgrounds/bgSVG";
import Navbar from "@/components/navbar/navbar";

export default {
  components: {
    Background,
    Navbar,
  },
};
</script>

<style></style>
