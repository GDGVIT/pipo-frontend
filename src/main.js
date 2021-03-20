import { createApp } from "vue";
import App from "./views/App.vue";
import router from "./router";
import firebase from "firebase/app";
import store from "./store";

var firebaseConfig = {
  apiKey: "AIzaSyDVDVeUjgQ4MRV8371SCvMk4mQn02T_uZ0",
  authDomain: "pipo-api-oauth.firebaseapp.com",
  databaseURL:
    "https://pipo-api-oauth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pipo-api-oauth",
  storageBucket: "pipo-api-oauth.appspot.com",
  messagingSenderId: "476866576555",
  appId: "1:476866576555:web:dbfcf253fd5016eb8677ee",
  measurementId: "G-GVBMMPCS3S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
