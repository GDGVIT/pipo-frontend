<template>
  <div class="bg-blue-100 h-screen">
    <!-- Login background -->
    <Background name="login-bg" class="login-bg" />

    <!-- Logo -->
    <LoginSVG name="pipoLogo" />

    <!-- Login button -->
    <div
      class="absolute top-1/4 left-1/2 transform -translate-x-1/2 md:top-8 md:translate-x-0 md:right-10 md:left-auto"
    >
      <div class="font-gbold text-3xl text-white text-center mb-6 md:hidden">
        Login
      </div>
      <LoginButton @click="signIn()" />
    </div>

    <div
      class="absolute left-1/2 top-1/3 absolute-center hidden md:block text-white text-center font-glight"
    >
      <div class="font-gbold text-5xl mb-5 tracking-wide">PiPo✨</div>
      <div class="leading-8 tracking-wide">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos,
        dolorum cum asperiores assumenda ad officiis quibusdam quidem, dolore
        fuga deleniti cupiditate molestiae non! Modi pariatur atque, temporibus
        eius delectus sint dignissimos maiores qui voluptatum fugiat quasi quo
        dolorem. Error, beatae.
      </div>
    </div>

    <LoginSVG name="pipoPenguin" class="pipo-penguin" />

    <!-- footer -->
    <div class="fixed bottom-5 left-1/2 transform -translate-x-1/2">
      <MadeWithLove />
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

import LoginSVG from "../components/login/loginSVG";
import Background from "../components/backgrounds/bgSVG";
import LoginButton from "../components/login/login-btn";
import MadeWithLove from "../components/login/made-with-love";

import { setUser } from "../composables/auth";
import { watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "login-page",
  setup() {
    const router = useRouter();
    const { isLoggedIn } = setUser();

    const stopWatch = watch(isLoggedIn, async () => {
      if (isLoggedIn) {
        await router.push("/");
        stopWatch();
      }
    });

    const signIn = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    };

    return { signIn };
  },
  components: {
    MadeWithLove,
    Background,
    LoginButton,
    LoginSVG,
  },
};
</script>
<style scoped>
/* The never ending saga of adjusting penguin and the background */
@media screen and (min-width: 490px) {
  .pipo-penguin {
    position: absolute;
    width: 120px;
    bottom: 7%;
    left: 16%;
  }
  .login-bg {
    width: 1400px;
    transform: translate(-16%, -2%);
  }
}

@media screen and (min-width: 683px) {
  .pipo-penguin {
    position: absolute;
    width: 120px;
    bottom: 2%;
    left: 16%;
  }
  .login-bg {
    width: 1400px;
    transform: translate(-16%, -2%);
  }
}

@media screen and (min-width: 940px) {
  .pipo-penguin {
    width: 120px;
    bottom: 2%;
    left: 22%;
  }
  .login-bg {
    width: 1400px;
    transform: translate(-6%, 0);
  }
}

@media screen and (min-width: 1230px) {
  .pipo-penguin {
    width: 120px;
    bottom: 2%;
    left: 24%;
  }
  .login-bg {
    width: 100%;
    transform: translate(0, -4%);
  }
}
</style>
