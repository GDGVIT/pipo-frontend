<template>
  <div class="container">
    <loginButtons />
    <loginButton />
    <loginBackground />
    <madeWithLove />
    <pipoPenguin />
    <pipoLogo />
  </div>
</template>
<script>
import {
  loginButton,
  loginBackground,
  madeWithLove,
  pipoPenguin,
  pipoLogo,
} from "./svgs/login";
import loginButtons from "./modules/login/login-btn";
export default {
  name: "login-page",
  components: {
    loginButton,
    loginButtons,
    loginBackground,
    madeWithLove,
    pipoPenguin,
    pipoLogo,
  },
};
</script>
<style scoped></style>
