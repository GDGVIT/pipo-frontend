import { readonly, ref } from 'vue'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { useToast } from 'vue-toastification'

const toast = useToast()

const notifications = ref([])
const permissionNeeded = ref(true)
const publicVapidIDKey = process.env.VUE_APP_PUBLIC_VAPID_KEY

/*
notifications schema

title
message
userId
*/

const notify = () => {
  const messaging = firebase.messaging()

  const receiveMessages = () => {
    messaging.onMessage((payload) => {
      notifications.value.push(payload)
      console.log('Message received :: ', payload)
    })
  }

  const clearMessages = () => {
    notifications.value = []
  }

  const resetUI = async () => {
    try {
      clearMessages()
      const currentToken = await messaging.getToken({
        vapidKey: publicVapidIDKey
      })
      if (currentToken) {
        sendTokenToServer(currentToken)
        receiveMessages()
        permissionNeeded.value = false
      } else {
        toast.info('PiPo requires your permission to send notifications!🙂')
        console.log(
          'No registration token available. Request permission to generate one.'
        )
        permissionNeeded.value = true
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err)
    }
  }

  const requestPermission = async () => {
    if (permissionNeeded.value) {
      try {
        const per = await Notification.requestPermission()
        if (per === 'granted') {
          console.log('Notification permission granted.')
          await resetUI()
        } else {
          console.log('Unable to get permission to notify.')
        }
      } catch (error) {
        console.log(
          'Error while requesting for permissions and setting the UI',
          error
        )
        toast.info('Unable to get permission to notify ! 😥')
      }
    }
  }

  const sendTokenToServer = (token) => {
    console.log(
      'fcm token to be sent to server (console logged for backend verification purpose will be removed later)',
      token
    )
  }

  const messages = readonly(notifications)

  return {
    messages,
    requestPermission
  }
}

export { notify }
