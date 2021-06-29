/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

// workbox
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkFirst()
);

// push notifs
try {
  firebase.initializeApp({
    apiKey: "AIzaSyDVDVeUjgQ4MRV8371SCvMk4mQn02T_uZ0",
    authDomain: "pipo-api-oauth.firebaseapp.com",
    databaseURL:
      "https://pipo-api-oauth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pipo-api-oauth",
    storageBucket: "pipo-api-oauth.appspot.com",
    messagingSenderId: "476866576555",
    appId: "1:476866576555:web:dbfcf253fd5016eb8677ee",
    measurementId: "G-GVBMMPCS3S",
  });

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  console.log("firebase service worker running in the background ma");

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.log("Error while using firebase service worker", error);
}
