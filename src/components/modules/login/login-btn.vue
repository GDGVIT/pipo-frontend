<template>
  <!-- done -->
  <button type="submit">
    Login PiPo using
    <loginSVG name="googleLogo" class="google-logo" />
  </button>
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
<style scoped>
.google-logo {
  width: 30px;
  padding-left: 10px;
}

button {
  font-family: Gilroy-Bold;
  font-size: 20px;
  background: white;
  border: none;
  padding: 10px 15px;
  outline: none;
  display: flex;
  align-items: center;
  border-radius: 5px;
}

button:hover {
  background: #e6e6e6;
}
</style>
