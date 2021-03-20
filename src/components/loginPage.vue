<template>
  <div class="container">
    <loginSVG name="login-bg" class="login-bg" />
    <div class="login">Login</div>
    <loginSVG name="pipoPenguin" class="pipo-penguin" />
    <loginButton @click="authenticateUser()" class="login-btn" />
    <loginSVG name="pipoLogo" class="pipoLogo" />
    <madeWithLove class="made" />
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

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
  methods: {
    authenticateUser() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          axios
            .post("http://pipo-api.herokuapp.com/auth", result)
            .then((res) => console.log(res).catch((err) => console.log(err)));
          this.$router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
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
  transform: translate(0, -10%);
}
.pipo-penguin {
  width: 150px;
  margin-left: 30%;
  transform: translate(-50%, 0);
  margin-top: 75vh;
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
  width: 150px;
  left: 30px;
  top: 10px;
}
</style>
