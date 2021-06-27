import api from '@/api.js'
import { generateIdenticon } from '../generate'
import { computed, readonly, ref } from 'vue'
import { setUser } from './auth'

const badges = ref([])
const completed = ref([])
const inProgress = ref([])

const getBadges = () => {
  const { config } = setUser()

  const loadBadges = async () => {
    if (badges.value.length === 0) {
      try {
        const res = await api.get('/badge', config.value)
        const b = res.data
        badges.value = b
          .map((badge) => {
            badge.identicon = generateIdenticon(badge.badgeName)
            return badge
          })
          .sort(sortByUpvotes)
      } catch (error) {
        console.log('Error while obtaining badges from backend!')
      }
    }
  }

  const getStreakBadges = computed(() =>
    badges.value.filter((badge) => badge.hasStreak)
  )

  const getNoStreakBadges = computed(() =>
    badges.value.filter((badge) => !badge.hasStreak)
  )

  const getAllBadges = readonly(badges)

  const postBadge = async (badgeData) => {
    try {
      const res = await api.post('/badge', badgeData, config.value)
      const { message, createdBadge } = res.data
      badges.value.push(createdBadge)
      return message
    } catch (error) {
      console.log('Error while posting badges from frontend to backend', error)
    }
  }

  return {
    loadBadges,
    getStreakBadges,
    getNoStreakBadges,
    postBadge,
    getAllBadges
  }
}

const getUserBadges = () => {
  const { config } = setUser()

  const loadInProgress = async () => {
    try {
      const res = await api.get('/badge/inProgress', config.value)
      const inProgressBadges = res.data.arr.map((badge) => {
        badge.identicon = generateIdenticon(badge.badgeName)
        return badge
      })
      inProgress.value = inProgressBadges
    } catch (error) {
      console.log('Error while retrieving in progress badges', error)
    }
  }

  const loadCompleted = async () => {
    try {
      const res = await api.get('/badge/completed', config.value)
      const completedBadges = res.data.userBadge.map((badge) => {
        badge.identicon = generateIdenticon(badge.badgeName)
        return badge
      })
      console.log('completed badges', completedBadges)
      completed.value = completedBadges
    } catch (error) {
      console.log('Error while retrieving completed badges', error)
    }
  }

  const getInProgress = readonly(inProgress)
  const getCompleted = readonly(completed)

  return { loadInProgress, loadCompleted, getInProgress, getCompleted }
}

const sortByUpvotes = (a, b) => b.upvotes - a.upvotes

export { getBadges, getUserBadges }
