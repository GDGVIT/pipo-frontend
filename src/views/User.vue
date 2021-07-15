<template>
  <Background name="darkBg" />
  <Navbar />
  <router-view />
</template>

<script>
import Background from "@/components/backgrounds/bgSVG";
import Navbar from "@/components/navbar/navbar";
import { setUser } from "../composables/auth";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Background,
    Navbar,
  },
  setup() {
    const { isLoggedIn } = setUser();
    const router = useRouter();

    watchEffect(() => {
      if (isLoggedIn.value === false) router.push("/login");
    });
  },
};
</script>

<style></style>
