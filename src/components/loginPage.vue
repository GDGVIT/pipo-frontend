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
const URL = "https://pipo-api.herokuapp.com/user/oAuth";

import { mapActions } from "vuex";

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
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authenticate();
        this.$router.replace("/");
      }
    });
  },
  methods: {
    ...mapActions({
      authenticate: "authenticateUser",
    }),
    authenticateUser: async function() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const signIn = await firebase.auth().signInWithPopup(provider);

        const idToken = await signIn.user.getIdToken(true);
        const result = await axios.post(URL, { idToken: idToken });

        console.log(result);

        this.authenticate();
        this.$router.replace("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
/* making it mobile first */

.login {
  font-family: Gilroy-Bold;
  color: white;
  position: absolute;
  top: 18%;
  left: 50%;
  font-size: 2rem;
  transform: translate(-50%, 0);
}

.pipo-penguin {
  width: 30%;
  position: absolute;
  bottom: 10vh;
  left: 2%;
}

.login-bg {
  width: 1250px;
  transform: translate(-20%, 0);
}

.pipoLogo {
  position: absolute;
  width: 30%;
  left: 30px;
  top: 10px;
}

.login-btn {
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, 0);
}

.login-btn:hover {
  cursor: pointer;
  opacity: 0.9;
}

.made {
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -125px;
}

@media screen and (min-width: 490px) {
  .pipo-penguin {
    width: 100px;
  }

  .pipoLogo {
    width: 100px;
  }
}

@media screen and (min-width: 940px) {
  .pipo-penguin {
    width: 150px;
    bottom: 10%;
    left: 20%;
  }

  .pipoLogo {
    width: 130px;
  }

  .login {
    display: none;
  }

  .login-btn {
    top: 25px;
    transform: translate(0, 0);
    left: 75%;
  }

  .login-bg {
    width: 100%;
    transform: translate(0, 0);
  }
}

@media screen and (min-width: 1230px) {
  .pipo-penguin {
    width: 130px;
  }

  .login-btn {
    left: 80%;
  }

  .login-bg {
    transform: translate(0, -13%);
  }
}

@media screen and (min-width: 1490px) {
  .login-bg {
    transform: translate(0, -18%);
  }
}
</style>
