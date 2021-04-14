<template>
  <!-- Login background -->
  <loginSVG name="login-bg" class="login-bg" />

  <div class="login">Login</div>
  <!-- TODO: Add tagline for login page -->
  <!-- <div
    class="absolute lg:block lg:top-1/3 lg:left-1/2 font-gbold text-center tracking-wide"
  >
    <div class="text-white text-3xl my-2">Post In Post Out</div>
    <div class="text-white text-xl">
      Learn Share and Record Your Journey <br />
      on becoming PiPo master
    </div>
  </div> -->
  <loginSVG name="pipoPenguin" class="pipo-penguin" />
  <loginButton @click="signIn()" class="login-btn" />
  <loginSVG name="pipoLogo" class="pipoLogo" />
  <madeWithLove class="made" />
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import api from "@/api.js";

import { mapActions } from "vuex";

import loginSVG from "../components/login/loginSVG";
import loginButton from "../components/login/login-btn";
import madeWithLove from "../components/login/made-with-love";

export default {
  name: "login-page",
  components: {
    madeWithLove,
    loginButton,
    loginSVG,
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          console.log("user", user);

          const uid = user.uid;
          const idToken = await user.getIdToken();
          const result = await api.post("/user/oAuth", { idToken: idToken });

          const authorizationToken = result.data.token;
          this.authenticate(authorizationToken);

          this.$router.replace(`/${uid}`);
        } catch (error) {
          console.error("Error has occured while logging in", error);
        }
      }
    });
  },
  methods: {
    ...mapActions({
      authenticate: "authenticateUser",
    }),
    async signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
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
