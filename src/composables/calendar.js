import api from '@/api.js'
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import { setUser } from './auth'

const postsOfAChallenge = () => {
  const { config, user } = setUser()
  const challengePosts = ref([])
  const error = ref(null)

  watch(error, () => window.alert(error.value))

  const loadChallengePosts = async (badgeId) => {
    if (badgeId && challengePosts.value.length === 0) {
      try {
        const res = await api.get(
          `/posts/filter/${badgeId}/${user.value.userId}`,
          config.value
        )
        challengePosts.value = res.data.response.sort(sortByDate)
      } catch (err) {
        console.log('Error while loading posts of challenge from backend', err)
        error.value = err
      }
    }
  }

  const badgeDetails = async (badgeId) => {
    if (badgeId) {
      try {
        const res = await api.get(`/badge/getBadge/${badgeId}`, config.value)
        return res.data.badge
      } catch (err) {
        console.log('Error while retrieving badge details from backend', err)
      }
    }
  }

  // not badgewise but actual streak in maintaining the badge
  const streakPosts = computed(() =>
    challengePosts.value.filter((post) => post.postNumber)
  )
  const nonStreakPosts = computed(() =>
    challengePosts.value.filter((post) => !post.postNumber)
  )

  return { loadChallengePosts, streakPosts, nonStreakPosts, badgeDetails }
}

const sortByDate = (a, b) => new Date(b.createDate) - new Date(a.createDate)

export { postsOfAChallenge }
