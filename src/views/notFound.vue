<template>
  <!-- done -->
  <div
    class="user-container font-gbold text-center bg-blue-100 text-myBlue h-screen"
  >
    <div class="text-5xl pt-8">Error 404</div>
    <h1 class="text-3xl mt-5 mb-10">Not Found</h1>
    <div class="w-3/5 mx-auto text-2xl md:text-3xl font-glight">
      PiPo couldn't find the page you're looking for 😓
    </div>
    <div class="grid place-items-center">
      <div class="mt-10 w-40">
        <loginSVG name="pipoPenguin" />
      </div>
    </div>
  </div>
</template>
<script>
import loginSVG from "../components/login/loginSVG";
export default {
  name: "not-found",
  components: {
    loginSVG,
  },
};
</script>
<style scoped>
.pipo-penguin {
  width: 200px;
}
</style>
