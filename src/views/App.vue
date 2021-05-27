<template>
  <router-view />
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import api from "@/api.js";
import { setUser } from "../composables/auth";

export default {
  name: "App",
  setup() {
    const { setLoggedInUser } = setUser();

    firebase.auth().onAuthStateChanged(async (u) => {
      console.log(u);
      if (u) {
        try {
          // token from firebase
          const idToken = await firebase.auth().currentUser.getIdToken();
          // console.log("idToken of the user", idToken);

          const res = await api.post("/user/oAuth", { idToken: idToken });

          console.log("User details from backend", res);

          // Retrieving details
          const userDetails = res.data.user;
          const onToken = res.data.token;

          setLoggedInUser(userDetails, onToken, true);
        } catch (error) {
          console.error("Error has occured while logging in", error);
        }
      } else {
        console.log("User not logged in");
        setLoggedInUser(null, null, false);
      }
    });
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
  border-radius: 20px;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
