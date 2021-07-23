import { readonly, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/api.js'
import { setUser } from '@/composables/auth.js'
import { generateIdenticon } from '@/generate.js'

const badges = ref([])
const completed = ref([])
const inProgress = ref([])
const toast = useToast()
const err = ref(null)

// semaphore
const canAddBadge = ref(true)

watch(err, () => toast.error(err.value))

const getBadges = () => {
  const { config } = setUser()

  const loadBadges = async () => {
    if (badges.value.length === 0) {
      try {
        const res = await api.get('/badge', config.value)
        badges.value = addIdenticons(res.data).sort(sortByUpvotes)
      } catch (error) {
        console.log('Error while obtaining badges from backend!')
        err.value = 'Unable to load badges'
      }
    }
  }

  const getAllBadges = readonly(badges)

  const postBadge = async (badgeData) => {
    if (canAddBadge.value) {
      try {
        canAddBadge.value = false

        if (!badgeData.badgeName) throw new Error('Give the badge a name')
        if (!badgeData.days) throw new Error('Number of days must be filled')
        if (!badgeData.hasChallenge) {
          throw new Error('Select whether the badge has streak or not')
        }
        if (!badgeData.badgeDescription) {
          throw new Error('Give the badge some description!')
        }

        const res = await api.post('/badge', badgeData, config.value)
        let { createdBadge } = res.data
        if (createdBadge) {
          createdBadge = addIdenticon(createdBadge)
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
    postBadge,
    getAllBadges
  }
}

const getUserBadges = () => {
  const { config } = setUser()

  const loadInProgress = async () => {
    try {
      const res = await api.get('/badge/inProgress', config.value)
      const inProgressBadges = res.data.inProgressbadges
      inProgress.value = addIdenticons(inProgressBadges)
    } catch (error) {
      console.log('Error while retrieving in progress badges', error)
      err.value =
        'Error while loading the in-progress badges try again after sometime! 🙄'
    }
  }

  const loadCompleted = async () => {
    try {
      const res = await api.get('/badge/completed', config.value)
      const completedBadges = res.data.completedBadges
      completed.value = addIdenticons(completedBadges)
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
const addIdenticons = (badges) => badges.map((badge) => addIdenticon(badge))
const addIdenticon = (badge) => {
  badge.identicon = generateIdenticon(badge.badgeName)
  return badge
}

export { getBadges, getUserBadges }
