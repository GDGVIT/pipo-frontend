import { ref } from 'vue'

const user = ref(null)
const config = ref({
  headers: {
    Authorization: null
  }
})
const isLoggedIn = ref(null)

const setUser = () => {
  const setLoggedInUser = (userDetails, token, logged) => {
    try {
      // console.log('Setting userdetails', userDetails, token, logged)
      user.value = userDetails
      isLoggedIn.value = logged
      config.value.headers.Authorization = token
    } catch (error) {
      console.log('Error while setting details of the user', error)
    }
  }

  return { user, setLoggedInUser, isLoggedIn, config }
}

export { setUser }
