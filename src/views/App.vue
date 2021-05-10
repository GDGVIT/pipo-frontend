<template>
  <router-view />
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import api from "@/api.js";

import { watch } from "vue";
import { useRouter } from "vue-router";
import { setUser } from "../composables/auth";

export default {
  name: "App",
  setup() {
    const { isLoggedIn, user, token, config } = setUser();
    const router = useRouter();

    firebase.auth().onAuthStateChanged(async (u) => {
      if (u) {
        try {
          console.log("Details of firebase authenticated user", u);

          // token from firebase
          const idToken = await firebase.auth().currentUser.getIdToken();
          // console.log("idToken of the user", idToken);

          const res = await api.post("/user/oAuth", { idToken: idToken });

          // Retrieving details
          const userDetails = res.data.user;
          const onToken = res.data.token;

          user.value = userDetails;
          token.value = onToken;
          isLoggedIn.value = true;
          config.value.headers.Authorization = onToken;
        } catch (error) {
          console.error("Error has occured while logging in", error);
        }
      } else {
        isLoggedIn.value = false;
        user.value = null;
        token.value = null;
        config.value = {
          headers: {
            Authorization: null,
          },
        };
      }
    });

    const stopWatch = watch(isLoggedIn, () => {
      if (isLoggedIn.value === false) {
        router.push("/login");
        stopWatch();
      } else if (isLoggedIn.value === true) {
        stopWatch();
      }
    });
  },
};
</script>

<style>
#app {
  overflow: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
