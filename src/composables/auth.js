import { ref } from 'vue'

const user = ref(null)
const token = ref(null)
const config = ref({
  headers: {
    Authorization: null
  }
})
const isLoggedIn = ref(null)

const setUser = () => {
  return { user, isLoggedIn, token, config }
}

export { setUser }
