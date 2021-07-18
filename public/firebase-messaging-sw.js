/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
)

// workbox
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.NetworkFirst()
)

// push notifs
try {
  // Set Firebase configuration, once available
  self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search)
    self.firebaseConfig = Object.fromEntries(urlParams)
  })

  // "Default" Firebase configuration (prevents errors)
  const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true
  }

  // Initialize Firebase app
  firebase.initializeApp(self.firebaseConfig || defaultConfig)

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging()

  console.log('firebase service worker running in the background')

  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    )
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  })
} catch (error) {
  console.log('Error while using firebase service worker', error)
}
