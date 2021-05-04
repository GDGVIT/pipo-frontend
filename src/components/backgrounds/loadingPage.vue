<template>
  <div
    class="fixed w-screen h-screen bg-gray-100 z-40 flex justify-items-center"
  >
    <div class="text-center">
      <LoginSVG class="w-40" name="pipoPenguin" />

      <div class="flex items-center">
        <span class="font-gbold text-3xl">Loading...</span>
        <div><LoadingSVG name="spinner" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginSVG from "@/components/login/loginSVG";
import LoadingSVG from "@/components/backgrounds/bgSVG";
export default {
  components: {
    LoadingSVG,
    LoginSVG,
  },
};
</script>

<style></style>
