<template>
  <div class="overflow-x-hidden">
    <div class="relative h-screen">
      <!-- Login background -->
      <Background name="login-bg" class="login-bg" />

      <!-- Logo -->
      <LoginSVG data-aos="fade-up" name="pipoLogo" />

      <!-- Penguin -->
      <div class="pipo-penguin">
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
        data-aos="fade-up"
        class="absolute top-1/4 left-1/3 transform -translate-x-1/2 md:top-8 md:translate-x-0 md:right-10 md:left-auto"
      >
        <div class="font-gbold text-3xl text-white text-center mb-6 md:hidden">
          Login
        </div>
        <LoginButton @click="signIn()" />
      </div>

      <div
        class="absolute left-1/2 top-1/3 absolute-center hidden md:block text-white text-center font-glight whitespace-nowrap"
      >
        <div class="font-gbold text-5xl mb-8 tracking-wide">PiPo✨</div>
        <div data-aos="fade-up" class="font-gbold text-5xl">
          #
          <span id="days" class="text-7xl text-myRed">100</span>
          Days of
          <span id="X" class="transition-opacity opacity-0 text-7xl text-myRed "
            >X</span
          >
        </div>
      </div>
    </div>
    <section id="details">
      <div
        class="grid place-items-center lg:grid-cols-2 bg-myRed my-5 font-gbold"
      >
        <div class="m-10">
          <div class="text-white text-4xl sm:text-6xl font-gbold">
            Post More. Gain Upvotes. Earn Badges and Points.
          </div>
          <div class="my-8">
            <LoginButton @click="signIn()" />
          </div>
        </div>

        <div class="animate-floating relative my-10">
          <div class="absolute">
            <Post
              :post="temporaryPost"
              class="w-l1 transform sm:rotate-12 sm:scale-90 z-10"
            />
          </div>
          <div class="animate-floating relative right-56">
            <Post
              :post="temporaryPost"
              class="w-l1 transform sm:-rotate-12 scale-0 sm:scale-50"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <div class="w-full my-3">
      <MadeWithLove />
    </div>
  </div>
</template>
<script>
import anime from "animejs/lib/anime.es.js";
import firebase from "firebase/app";
import "firebase/auth";

import LoginSVG from "../components/login/loginSVG";
import Background from "../components/backgrounds/bgSVG";
import LoginButton from "../components/login/login-btn";
import MadeWithLove from "../components/login/made-with-love";
import Post from "../components/post/post.vue";

import { setUser } from "../composables/auth";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "login-page",
  components: {
    MadeWithLove,
    Background,
    LoginButton,
    LoginSVG,
    Post,
  },
  setup() {
    const router = useRouter();
    // const ax = ["X", "Weight Loss", "Meditation", "Tech", "your hardwork"];

    const { isLoggedIn, signInAttempt, hasAttemptedSignIn } = setUser();
    const showLoading = ref(false);

    if (hasAttemptedSignIn.value) showLoading.value = true;

    const temporaryPost = {
      postId: 1,
      title: "A PiPo Post Card",
      image: ["https://i.imgur.com/HuNalGN.png"],
      description:
        "Enter some spicy content here. Maybe some latest framework or some tips to reduce fat or increase productivity. Your imagination is the limit!",
      badgeName: "PiPo",
      tags: ["spicy🔥", "tag your content here"],
      username: "username",
      upvotes: ["1", "2", "3"],
      points: "200 Points",
    };

    onMounted(() => {
      anime({
        targets: "#days",
        innerHTML: [0, 100],
        duration: 5000,
        round: 1,
      });

      const t = anime.timeline({
        easing: "easeOutExpo",
        targets: "#X",
        duration: 2000,
      });

      t.add({
        innerHTML: "good",
        keyframes: [
          { opacity: 1, translateY: 250 },
          { opacity: 0, translateY: -250 },
          { opacity: 1, translateY: 250 },
        ],
      });
    });

    onMounted(() => {
      anime({
        targets: "#days",
        innerHTML: [0, 100],
        duration: 5000,
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

    return { signIn, temporaryPost, showLoading };
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

.animateX {
  transition-property: "opacity";
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 1000ms;
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
