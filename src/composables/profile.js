import api from '@/api.js'
import { computed, ref } from 'vue'
import { setUser } from './auth'

const { config } = setUser()

const user = ref(null)
const followers = ref([])
const following = ref([])

const getProfile = () => {
  const loadProfile = async () => {
    if (!user.value) {
      try {
        const res = await api.get('/user/getUser', config.value)
        user.value = filterUser(res.data)
        console.log('user value', user.value)
      } catch (error) {
        console.log(
          'Error occured while fetching user details from backend',
          error
        )
      }
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
      window.alert('Username updated refresh page to see the changes')
    } catch (error) {
      console.log('Error while updating user details in the backend', error)
    }
  }

  const profile = computed(() => user.value)

  return { profile, loadProfile, changeUserDetails }
}

const socialCircle = () => {
  const loadFollowing = async () => {
    if (following.value.length === 0) {
      try {
        const res = await api.get('/follow/following', config.value)
        following.value = res.data
        console.log('Following', following.value)
      } catch (error) {
        console.log(
          'Error while fetching following of user from backend',
          error
        )
      }
    }
  }

  const loadFollowers = async () => {
    if (followers.value.length === 0) {
      try {
        const res = await api.get('/follow/followers', config.value)
        followers.value = res.data
        console.log('Followers', followers.value)
      } catch (error) {
        console.log(
          'Error while fetching followers of user from backend',
          error
        )
      }
    }
  }

  // Social Circle
  const friends = computed(() =>
    followers.value.filter((user) => user.isFriend)
  )

  // Count
  const followersCount = computed(() => followers.value?.length)
  const followingCount = computed(() => following.value?.length)
  const friendsCount = computed(
    () => followers.value.filter((user) => user.isFriend)?.length
  )

  return {
    loadFollowers,
    loadFollowing,
    friends,
    followersCount,
    followingCount,
    friendsCount
  }
}

const filterUser = (user) => {
  user.userName = user.userName === null ? 'anonymous' : user.userName
  user.points = user.points === null ? 0 : user.points
  user.tags = user.tags === null ? [] : user.tags
  user.todo = user.todo === null ? [] : user.todo
  return user
}

export { getProfile, socialCircle }
