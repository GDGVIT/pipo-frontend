<template>
  <Background name="darkBg" @click="hideBgNav" />
  <Navbar />
  <router-view @click="hideNav" />
</template>

<script>
import Background from "@/components/backgrounds/bgSVG";
import Navbar from "@/components/navbar/navbar";
import { mapActions } from "vuex";

export default {
  components: {
    Background,
    Navbar,
  },
  methods: {
    ...mapActions({
      hide: "hideNavbar",
    }),
    hideNav() {
      this.hide();
    },
    hideBgNav() {
      console.log("Background clicked");
      this.hide();
    },
  },
};
</script>

<style></style>
