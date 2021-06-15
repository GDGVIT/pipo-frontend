<template>
  <div>
    <div class="relative">
      <!-- Login background -->
      <Background name="login-bg" class="login-bg" />

      <!-- Logo -->
      <LoginSVG name="pipoLogo" />

      <!-- Penguin -->
      <LoginSVG name="pipoPenguin" class="pipo-penguin" />

      <!-- Login button -->
      <div
        class="absolute top-1/4 left-1/2 transform -translate-x-1/2 md:top-8 md:translate-x-0 md:right-10 md:left-auto"
      >
        <div class="font-gbold text-3xl text-white text-center mb-6 md:hidden">
          Login
        </div>
        <LoginButton @click="signIn()" />
      </div>

      <!-- absolute left-1/2 top-1/3 absolute-center hidden md:block text-white text-center font-glight -->
      <div
        class="absolute left-1/2 top-1/3 absolute-center hidden md:block text-white text-center font-glight"
      >
        <div class="font-gbold text-5xl mb-8 tracking-wide">PiPo✨</div>
        <div class="leading-8 text-xl tracking-wide">
          Your all in one personal scrapbook. Challenge your friends, maintain
          streaks to gain badges and gain upvotes to your posts to earn points.
          More are the points the merrier.
        </div>
      </div>
    </div>

    <div class="">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure in vel
      eveniet laboriosam hic nulla minus reiciendis expedita numquam ullam?
    </div>
    <!-- footer -->
    <div class="w-full mt-3">
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

    watch(isLoggedIn, async () => {
      if (isLoggedIn) await router.push("/");
    });

    const signIn = async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithRedirect(provider);
      } catch (error) {
        console.log("Error while signing in with popup in firebase", error);
      }
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
.pipo-penguin {
  position: relative;
  width: 120px;
  margin-top: -120px;
  left: 16%;
}
.login-bg {
  width: 1400px;
  transform: translate(-18%, -5%);
}

@media screen and (min-width: 530px) {
  .login-bg {
    transform: translate(-16%, -5%);
  }
}

@media screen and (min-width: 640px) {
  .login-bg {
    transform: translate(-14%, -7%);
  }
}

@media screen and (min-width: 940px) {
  .pipo-penguin {
    left: 22%;
  }
  .login-bg {
    transform: translate(-6%, -7%);
  }
}

@media screen and (min-width: 1230px) {
  .login-bg {
    width: 100%;
    transform: translate(0, -4%);
  }
}

@media screen and (min-width: 1500px) {
  .login-bg {
    transform: translate(0, -6%);
  }
}
</style>
