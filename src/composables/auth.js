import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { validateUserName } from './posts'

const signInClicked = ref(false)
const user = ref(null)
const toast = useToast()
const config = ref({
  headers: {
    Authorization: null
  }
})
const isLoggedIn = ref(null)

const setUser = () => {
  const setLoggedInUser = (userDetails, token, logged) => {
    try {
      user.value = userDetails
      if (user.value?.userName) { user.value.userName = validateUserName(user.value.userName) }

      isLoggedIn.value = logged
      config.value.headers.Authorization = token
      signInClicked.value = false
    } catch (error) {
      console.log('Error while setting details of the user', error)
      toast.error("We aren't able to log you in. Try refreshing the page 🙁")
    }
  }

  const signInAttempt = () => (signInClicked.value = true)

  const hasAttemptedSignIn = computed(() => signInClicked.value)

  return {
    user,
    setLoggedInUser,
    isLoggedIn,
    config,
    signInAttempt,
    hasAttemptedSignIn
  }
}

export { setUser }
