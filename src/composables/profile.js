import api from '@/api.js'
import { computed, readonly, ref, watch } from 'vue'
import { setUser } from './auth'
import { useToast } from 'vue-toastification'
import { validateUserName } from '../composables/posts'

const { config, user } = setUser()

const userInfo = ref(null)
const followers = ref([])
const following = ref([])
const error = ref(null)
const toast = useToast()

// watch for errors
watch(error, () => toast.error(error.value))

const getProfile = () => {
  const loadProfile = async () => {
    try {
      if (!userInfo.value && user.value?.userId) {
        const res = await api.get(`/user/${user.value.userId}`, config.value)
        userInfo.value = filterRandomUser(res.data)
        console.log('user value', userInfo.value)
      }
    } catch (err) {
      console.log(
        'Error occured while fetching user details from backend',
        err
      )
      error.value =
        "Wasn't while fetching your details. Try again after sometime! 😓"
    }
  }

  const changeUserDetails = async (data) => {
    try {
      await api.patch(
        '/user/update',
        {
          ...data
        },
        config.value
      )
      toast.success('Username updated refresh page to see the changes')
    } catch (error) {
      console.log('Error while updating user details in the backend', error)
    }
  }

  const profile = computed(() => userInfo.value)

  return { profile, loadProfile, changeUserDetails }
}

const socialCircle = () => {
  const randomUserInfo = ref(null)

  const loadFollowing = async () => {
    if (user.value.userId && following.value.length === 0) {
      try {
        const res = await api.get(
          `/follow/following/${user.value.userId}`,
          config.value
        )

        console.log('Following users', res.data)
        const len = res.data?.length

        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const u = await api.get(
              `/user/${res.data[i].followingId}`,
              config.value
            )
            following.value?.push(u.data?.user)
          }
        }
        console.log('Following', following.value)
      } catch (err) {
        console.log('Error while fetching following of user from backend', err)
        error.value =
          "Issues loading the users you're following. Try again after sometime🙄"
      }
    }
  }

  const loadFollowers = async () => {
    if (user.value.userId && followers.value.length === 0) {
      try {
        const res = await api.get(
          `/follow/followers/${user.value.userId}`,
          config.value
        )
        console.log('Followers users', res.data)
        const len = res.data?.length

        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const u = await api.get(
              `/user/${res.data[i].followerId}`,
              config.value
            )
            followers.value?.push(u.data?.user)
          }
        }
        console.log('Followers', followers.value)
      } catch (err) {
        console.log('Error while fetching followers of user from backend', err)
        error.value =
          'Issues loading your followers. Try again after sometime🙄'

        error.value = err
      }
    }
  }

  const followThisPerson = async (userId) => {
    if (userId) {
      try {
        console.log('User id of the user to be followed..', userId)
        const res = await api.post(
          `/follow/toFollow/${userId}`,
          {},
          config.value
        )
        console.log('Response from backend on following the user', res)
        if (res.data.message) {
          toast.error(res.data.message)
          return 1
        }
        randomUserInfo.value.user.following++
        toast.success('Following this person 🤗')

        following.value.push(res.data)
        return 0
      } catch (err) {
        error.value =
          'Unable to follow this person. Try again after sometime😓'
        console.log('Error while attempting to follow the user', err)
        return 1
      }
    }
  }

  const social = () => {
    const followingPeople = readonly(following)
    const followersPeople = readonly(followers)
    return { followingPeople, followersPeople }
  }

  const getRandomUserProfile = async (userId) => {
    if (userId) {
      try {
        const res = await api.get(`/user/${userId}`, config.value)
        const randomUserFiltered = filterRandomUser(res.data)
        randomUserInfo.value = randomUserFiltered
        console.log('Random user details', randomUserInfo.value)
      } catch (err) {
        console.log(
          'Error while fetching random user details from backend',
          err
        )
      }
    }
  }

  const randomUserDetails = computed(() => randomUserInfo.value)

  return {
    loadFollowers,
    loadFollowing,
    followThisPerson,
    getRandomUserProfile,
    randomUserDetails,
    social
  }
}

const filterRandomUser = (u) => {
  u.user.userName = validateUserName(
    u.user.userName ? u.user.userName : 'anonymous'
  )
  u.user.points = u.user.points ? u.user.points : 0
  u.user.tags = u.user.tags ? u.user.tags : []
  if (u.user.tags.length > 5) u.user.tags = u.user.tags.slice(0, 5)
  return u
}

export { getProfile, socialCircle }
