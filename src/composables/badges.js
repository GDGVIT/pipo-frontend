import api from '@/api.js'
import { generateIdenticon } from '../generate'
import { computed, readonly, ref, watch } from 'vue'
import { setUser } from './auth'
import { useToast } from 'vue-toastification'

const badges = ref([])
const completed = ref([])
const inProgress = ref([])
const toast = useToast()
const err = ref(null)

const canAddBadge = ref(true)

watch(err, () => toast.error(err.value))

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
        err.value = 'Unable to load badges'
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
    if (canAddBadge.value) {
      try {
        canAddBadge.value = false

        if (!badgeData.badgeName) {
          throw new Error('Give the badge a name')
        }
        if (!badgeData.days) {
          throw new Error('Number of days must be filled')
        }
        if (!badgeData.hasChallenge) {
          throw new Error('Select whether the badge has streak or not')
        }

        const res = await api.post('/badge', badgeData, config.value)
        const { createdBadge } = res.data
        console.log('Response on posting a badge from backend', res)
        if (createdBadge) {
          createdBadge.identicon = generateIdenticon(createdBadge.badgeName)
          badges.value.push(createdBadge)
          toast.success('New badge successfully added 🥳')
        } else {
          throw new Error('Unable to upload badge😣')
        }
        canAddBadge.value = true

        return 0
      } catch (error) {
        console.log(
          'Error while posting badges from frontend to backend',
          error
        )
        err.value = error.message
        canAddBadge.value = true
        return 1
      }
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
      err.value =
        'Error while loading the in-progress badges try again after sometime! 🙄'
    }
  }

  const loadCompleted = async () => {
    try {
      const res = await api.get('/badge/completed', config.value)
      const completedBadges = res.data.userBadge.map((badge) => {
        badge.identicon = generateIdenticon(badge.badgeName)
        return badge
      })
      completed.value = completedBadges
    } catch (error) {
      console.log('Error while retrieving completed badges', error)
      err.value = 'Error while loading the completed badges try again later 😶'
    }
  }

  const getInProgress = readonly(inProgress)
  const getCompleted = readonly(completed)

  return { loadInProgress, loadCompleted, getInProgress, getCompleted }
}

const sortByUpvotes = (a, b) => b.upvotes - a.upvotes

export { getBadges, getUserBadges }
