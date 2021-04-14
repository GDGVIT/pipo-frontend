<template>
  <h1 class="mt-96 text-white">
    This is my posts route
  </h1>
</template>

<script>
export default {
  name: "my-posts",
  mounted() {
    console.log("params", this.$router.params);
  },
};
</script>

<style></style>
