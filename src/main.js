import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import './assets/tailwind.css'

const firebaseConfig = {
  apiKey: 'AIzaSyDVDVeUjgQ4MRV8371SCvMk4mQn02T_uZ0',
  authDomain: 'pipo-api-oauth.firebaseapp.com',
  databaseURL:
    'https://pipo-api-oauth-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pipo-api-oauth',
  storageBucket: 'pipo-api-oauth.appspot.com',
  messagingSenderId: '476866576555',
  appId: '1:476866576555:web:dbfcf253fd5016eb8677ee',
  measurementId: 'G-GVBMMPCS3S'
}

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(store)
  .directive('click-outside', clickOutside)
  .mount('#app')
