<template>
  <router-view />
  <template v-if="showLoading">
    <LoadingScreen />
  </template>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import api from "@/api.js";
import { setUser } from "../composables/auth";
import LoadingScreen from "../components/loadComponents/loadingScreen.vue";
import { ref } from "@vue/reactivity";

export default {
  name: "App",
  components: { LoadingScreen },
  setup() {
    const { setLoggedInUser } = setUser();
    const showLoading = ref(false);

    firebase.auth().onAuthStateChanged(async (u) => {
      if (u) {
        try {
          showLoading.value = true;
          // token from firebase
          const idToken = await firebase.auth().currentUser.getIdToken();
          // console.log("idToken of the user", idToken);

          const res = await api.post("/user/oAuth", { idToken: idToken });

          console.log("User details from backend", res);

          // Retrieving details
          const userDetails = res.data.user;
          const onToken = res.data.token;

          setLoggedInUser(userDetails, onToken, true);
          showLoading.value = false;
        } catch (error) {
          console.error("Error has occured while logging in", error);
        }
      } else {
        setLoggedInUser(null, null, false);
      }
    });

    return { showLoading };
  },
};
</script>

<style>
#app {
  overflow: hidden;
}

::-webkit-scrollbar {
  background-color: white;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background-color: #ff6666;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
