/* eslint-disable no-console */

import { register } from 'register-service-worker'

const firebaseConfig = new URLSearchParams({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'pipo-api-oauth.firebaseapp.com',
  databaseURL:
    'https://pipo-api-oauth-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pipo-api-oauth',
  storageBucket: 'pipo-api-oauth.appspot.com',
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}).toString()

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  register(
    `${process.env.BASE_URL}firebase-messaging-sw.js?${firebaseConfig}`,
    {
      ready () {
        console.log(
          'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB'
        )
      },
      registered () {
        console.log('Service worker has been registered.')
      },
      cached () {
        console.log('Content has been cached for offline use.')
      },
      updatefound () {
        console.log('New content is downloading.')
      },
      updated () {
        console.log('New content is available; please refresh.')
      },
      offline () {
        console.log(
          'No internet connection found. App is running in offline mode.'
        )
      },
      error (error) {
        console.error('Error during service worker registration:', error)
      }
    }
  )
}
