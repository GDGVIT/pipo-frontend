<template>
  <div class="overflow-x-hidden">
    <div class="relative">
      <!-- Login background -->
      <Background name="login-bg" class="login-bg" />

      <!-- Logo -->
      <LoginSVG name="pipoLogo" />

      <!-- Penguin -->
      <div class="pipo-penguin my-10">
        <LoginSVG name="pipoPenguin" />
      </div>

      <!-- Down -->
      <div
        class="absolute animate-bounce bottom-4 w-10 transform left-1/2 text-myBlue"
      >
        <LoginSVG name="narrowDownArrow" />
      </div>

      <!-- Login button -->
      <div
        class="absolute top-1/4 w-full grid place-items-center md:w-auto md:top-8 md:translate-x-0 md:right-10 md:left-auto"
      >
        <div class="font-gbold text-3xl text-white text-center mb-6 md:hidden">
          Login
        </div>
        <button @click="signIn()">
          <img
            :src="require('@/assets/google-signin.png')"
            alt="login"
            class="cursor-pointer"
            width="191"
            height="46"
          />
        </button>
      </div>

      <div
        class="absolute left-1/2 top-1/3 absolute-center hidden md:block text-white text-center font-glight whitespace-nowrap"
      >
        <div class="font-gbold text-5xl mb-8 tracking-wide">PiPo✨</div>
        <div data-aos="fade-up" class="font-gbold text-5xl">
          #
          <span id="days" class="text-7xl text-myRed">100</span>
          Days of
          <span class="text-7xl text-myRed ">X</span>
        </div>
      </div>
    </div>
    <section class="bg-myRed py-20 font-gbold">
      <div class="text-white text-4xl md:text-5xl text-center p-4">
        About PiPo
      </div>
      <!-- timeline container -->
      <div class="ml-6 sm:ml-20 md:ml-40 mt-10">
        <div
          v-for="(instruction, index) in timeline"
          :key="index"
          class="grid grid-cols-12 items-center border-l-2 border-white"
        >
          <div
            class="w-6 h-6 rounded-full bg-white grid place-items-center text-myRed relative -left-3"
          >
            <Icon name="tick" />
          </div>
          <div
            data-aos="fade-right"
            :data-aos-delay="index * 100"
            class="col-span-11 text-white p-4"
          >
            <div class="text-3xl my-3">{{ instruction.title }}</div>
            <div class="font-glight w-11/12 md:w-2/3 lg:w-1/2">
              {{ instruction.description }}
            </div>
            <div v-if="instruction.image">
              <img :src="instruction.image" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div
        class="grid place-items-center lg:grid-cols-2 bg-gray-100 py-5 font-gbold"
      >
        <div class="m-3 sm:m-10" data-aos="fade-right">
          <div class="text-4xl sm:text-6xl font-gbold p-10">
            Post More. Gain Upvotes. Earn Badges and Points.
          </div>
          <div class="my-8 ml-10 inline-block cursor-pointer">
            <img
              @click="signIn()"
              :src="require('@/assets/google-signin.png')"
              alt="login"
              width="191"
              height="46"
            />
          </div>
        </div>

        <div class="animate-floating relative my-10">
          <div class="absolute px-10" data-aos="fade-left">
            <Post
              :post="temporaryPost"
              class="sm:w-l1 transform sm:rotate-12 sm:scale-90 z-10"
            />
          </div>
          <div class="animate-floating relative right-44" data-aos="fade-left">
            <Post
              :post="temporaryPost"
              class="sm:w-l1 transform sm:-rotate-12 scale-0 sm:scale-50"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <div class="w-full py-3 bg-gray-100">
      <MadeWithLove />
    </div>
  </div>
</template>
<script>
import anime from "animejs/lib/anime.es.js";
import firebase from "firebase/app";
import "firebase/auth";

import LoadingCard from "@/components/loadComponents/LoadingCard";
import Icon from "@/components/user/userIcons";
import LoginSVG from "@/components/login/loginSVG";
import Background from "@/components/backgrounds/bgSVG";
import MadeWithLove from "@/components/login/madeWithLove";
import { setUser, templates } from "../composables/auth";
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const Post = defineAsyncComponent({
  loader: () => import("@/components/post/post" /*webpackChunkName: "Post"*/),
  loadingComponent: LoadingCard,
  delay: 200,
});

export default {
  name: "login-page",
  components: {
    MadeWithLove,
    Background,
    LoginSVG,
    Post,
    Icon,
  },
  setup() {
    const router = useRouter();
    const { timeline, temporaryPost } = templates();

    const { isLoggedIn, signInAttempt, hasAttemptedSignIn } = setUser();
    const showLoading = ref(false);

    if (hasAttemptedSignIn.value) showLoading.value = true;

    onMounted(() => {
      anime({
        targets: "#days",
        innerHTML: [0, 100],
        duration: 9000,
        round: 1,
      });
      anime({
        targets: ".displayPost",
        keyframes: [{ translateY: 5 }, { translateY: -5 }],
        loop: true,
        duration: 3000,
        easing: "easeOutCubic",
      });
    });

    watch(isLoggedIn, async () => {
      if (isLoggedIn.value) {
        showLoading.value = false;
        await router.push("/");
      }
    });

    const signIn = async () => {
      try {
        signInAttempt();
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithRedirect(provider);
      } catch (error) {
        console.log("Error while signing in with popup in firebase", error);
      }
    };

    return { signIn, temporaryPost, showLoading, timeline };
  },
};
</script>
<style scoped>
/* The never ending saga of adjusting penguin and the background */
.pipo-penguin {
  position: relative;
  width: 120px;
  height: 125px;
  margin-top: -150px;
  left: 14%;
}
.login-bg {
  width: 1300px;
  transform: translate(-18%, -10%);
}

@media screen and (min-width: 530px) {
  .login-bg {
    transform: translate(-16%, -10%);
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
    transform: translate(-4%, -7%);
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
