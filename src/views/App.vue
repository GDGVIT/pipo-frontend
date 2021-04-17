<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    this.$router.replace("/login");
  },
};
</script>

<style>
#app {
  overflow: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
