import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { validateUserName } from './posts'

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
      if (user.value?.userName) {
        user.value.userName = validateUserName(user.value.userName)
      }

      isLoggedIn.value = logged
      config.value.headers.Authorization = token
    } catch (error) {
      console.log('Error while setting details of the user', error)
      toast.error("We aren't able to log you in. Try refreshing the page 🙁")
    }
  }

  return {
    user,
    setLoggedInUser,
    isLoggedIn,
    config
  }
}

const templates = () => {
  const temporaryPost = {
    postId: 1,
    title: 'A PiPo Post Card Title',
    image: ['https://i.imgur.com/HuNalGN.png'],
    description:
      'Enter some spicy content here. Maybe some latest framework or some tips to reduce fat or increase productivity. Your imagination is the limit!',
    badgeName: 'PiPo',
    tags: ['spicy🔥', 'another tag'],
    username: 'username',
    upvotes: ['1', '2', '3'],
    points: '200'
  }

  const timeline = [
    {
      title: 'Login using Oauth',
      description: 'Sign in using your Google account'
    },
    {
      title: 'Add a post',
      description:
        'Click on add post button. Fill in the details and select the challenge you want to take up. Upon completing a challenge the user earns a badge. The list of badges available and taken up by you in the past can be seen in the badges page'
    },
    {
      title: 'Profile',
      description:
        'Displays your current social status, interests and tasks. Badges you have earned and currently working on. Badges are said to be completed when the user takes up the challenge and maintains a streak for that challenge for x days'
    },
    {
      title: 'Track your Progress',
      description:
        'Select a badge from your profile to open calendar page. It shows your posts as timeline and numbers of days left to earn a badge. Remember that posts related of a challenge have to be posted daily in order for the streak to be maintained'
    },
    {
      title: 'The Final Day',
      description:
        'If you have managed to maintain a streak of x days depending on challenge then the badge is all yours and others get to see your badge when they view your profile'
    },
    {
      title: 'Points',
      description:
        "It's not only about quantity but quality as well. Posts which are crisp, to the point and describes your journey throughout the challenge are likely to get more upvotes. More upvotes implies more points. User with highest points get to be on top of others in the leaderboard"
    }
  ]

  return { temporaryPost, timeline }
}

export { setUser, templates }
