<template>
  <div class="container">
    <loginSVG name="login-bg" class="login-bg" />
    <div class="login">Login</div>
    <loginSVG name="pipoPenguin" class="pipo-penguin" />
    <loginButton class="login-btn" />
    <loginSVG name="pipoLogo" class="pipoLogo" />
    <madeWithLove class="made" />
  </div>
</template>
<script>
import loginSVG from "./modules/login/loginSVG";
import loginButton from "./modules/login/login-btn";
import madeWithLove from "./modules/login/made-with-love";

export default {
  name: "login-page",
  components: {
    madeWithLove,
    loginButton,
    loginSVG,
  },
};
</script>
<style scoped>
/* .container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
} */
.login {
  font-family: Gilroy-Bold;
  color: white;
  position: absolute;
  top: 18%;
  left: 50%;
  font-size: 2rem;
  transform: translate(-50%, 0);
}
.login-bg {
  position: absolute;
  z-index: -1;
}
.pipo-penguin {
  width: 40%;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 95%;
}

.login-btn {
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, 0);
}

.made {
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -125px;
}

.pipoLogo {
  position: absolute;
  width: 30%;
  left: 10px;
  top: 5px;
}
</style>
