import { createApp } from 'vue'
import App from './views/App.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router'
import firebase from 'firebase/app'
import './assets/tailwind.css'
import './registerServiceWorker'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'pipo-api-oauth.firebaseapp.com',
  databaseURL:
    'https://pipo-api-oauth-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pipo-api-oauth',
  storageBucket: 'pipo-api-oauth.appspot.com',
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
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

const app = createApp(App)
  .use(router)
  .use(Toast, {
    position: POSITION.TOP_CENTER,
    toastClassName: 'font-gbold'
  })
  .directive('click-outside', clickOutside)
  .mount('#app')

app.AOS = AOS.init()
