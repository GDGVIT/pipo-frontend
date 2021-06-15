<template>
  <!-- done -->
  <div>
    <button
      type="submit"
      class="flex items-center px-4 py-2 font-glight text-lg bg-white tracking-wider text-gray-800 focus:outline-none rounded-sm"
    >
      <div class="whitespace-nowrap">Login PiPo using</div>
      <loginSVG name="googleLogo" class="w-7 pl-3" />
    </button>
  </div>
</template>
<script>
import loginSVG from "./loginSVG";
export default {
  name: "login-btn",
  components: {
    loginSVG,
  },
};
</script>
<style scoped></style>
