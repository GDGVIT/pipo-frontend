import api from '@/api.js'
import { computed, reactive, readonly, ref, watch } from 'vue'
import { setUser } from './auth'
import { generateIdenticon, timeAgo } from '@/generate.js'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const POSTS_COUNT = 6
const USERNAME_LENGTH_LIMIT = 10

const toast = useToast()
const err = ref('')

// Semaphores
const sem = reactive({
  canAddPost: true,
  canVote: true,
  canComment: true
})

const posts = reactive({
  general: [],
  mine: [],
  randomUser: [],
  home: []
})

// filtered ones from fuse.js

const fuse = reactive({
  general: [],
  mine: [],
  randomUser: [],
  home: []
})

// current post to be sent
const currentPost = ref(null)

const latestPost = ref(null)
const currIndex = ref(0)
const count = ref(POSTS_COUNT)

watch(err, () => toast.error(err.value))

const originalPosts = () => {
  const immutablePosts = readonly(posts)
  return { immutablePosts }
}

const updateFuse = () => {
  const generalUpdate = (p) => (fuse.general = p)
  const myUpdate = (p) => (fuse.mine = p)
  const randomUserUpdate = (p) => (fuse.randomUser = p)
  const homeUpdate = (p) => (fuse.home = p)

  return { generalUpdate, myUpdate, randomUserUpdate, homeUpdate }
}

// LATEST POST
const getLatestPost = () => {
  const { config, user } = setUser()

  const temporaryPost = () => {
    return {
      title: 'Start your journey today!',
      description:
        'No Latest Post yet! Well, this is the beginning of your journey why not add some posts and see what others think about it 🤔. Pick out any challenge you like and work on it🔥. Lost? You can always check out the details by clicking on the logo on top 😊',
      image: ['https://i.imgur.com/HuNalGN.png']
    }
  }

  const updateLatestPost = async () => {
    try {
      latestPost.value = temporaryPost()
      const res = await api.get('/posts/mypost/myLatestPost', config.value)
      // console.log('res of my latest post from backend', res)
      const myLatestPost = filterMyPost(res.data, user.value?.userName)
      latestPost.value = myLatestPost
    } catch (error) {
      console.log('Error while obtaining latest post from backend')
      err.value = "Couldn't load your latest post 🙄"
    }
  }

  return { updateLatestPost, latestPost }
}

// POSTS OF PEOPLE USER IS FOLLOWING
const home = () => {
  const { config } = setUser()
  count.value = POSTS_COUNT

  const loadHomePosts = async () => {
    if (config.value) {
      try {
        const res = await api.get(
          '/posts/get/followerLatestPosts/',
          config.value
        )
        const homePosts = res.data.posts.map((post) => {
          post.username = post.userName
          return post
        })
        // console.log("home posts", homePosts);
        posts.home = filterPost(homePosts)
        fuse.home = filterPost(homePosts)
        // console.log('home posts', homePosts)
      } catch (error) {
        console.log(
          'Error while receiving posts of people user is following from backend',
          error
        )
        err.value =
          "Can't load the posts of people you're following. Try again after sometime 😞"
      }
    }
  }

  const loadMore = async () =>
    (count.value += fuse.home.length < count.value ? 0 : 8)

  const filtered = computed(() => fuse.home.slice(0, count.value))

  return { loadHomePosts, loadMore, filtered }
}

// GENERAL POSTS
const getPosts = () => {
  // To reset the count to 8
  count.value = POSTS_COUNT
  const { config } = setUser()

  const loadPosts = async () => {
    if (config.value) {
      try {
        const res2 = await api.get('/posts/allLatestPosts/all', config.value)
        const latestPosts = res2.data.posts
        posts.general = filterPost(latestPosts)
        fuse.general = filterPost(latestPosts)
        // console.log('General posts', posts.general)
      } catch (error) {
        console.log('Error while receiving latest posts from backend', error)
        err.value = 'There was an issue loading posts try again later 😖'
      }
    }
  }

  const loadMore = async () =>
    (count.value += fuse.general.length < count.value ? 0 : 8)

  const filtered = computed(() => fuse.general.slice(0, count.value))

  return { loadPosts, loadMore, filtered }
}

// MY POSTS
const myPostsFn = () => {
  count.value = POSTS_COUNT
  const { config, user } = setUser()

  const loadMyPosts = async () => {
    try {
      if (config.value) {
        const res = await api.get(
          `/posts/of/${user.value.userId}`,
          config.value
        )
        const myposts = filterMyPosts(res.data.posts, user)
        // console.log('my posts', myposts)
        posts.mine = myposts
        fuse.mine = myposts
      }
    } catch (error) {
      console.log('Error while receiving latest posts from backend', error)
      err.value =
        'Unable to load your latest posts. Try again after sometime 😕'
    }
  }

  const filtered = computed(() => fuse.mine.slice(0, count.value))

  const loadMore = async () =>
    (count.value += fuse.mine.length < fuse.mine ? 0 : 8)

  return { filtered, loadMore, loadMyPosts }
}

// ADD POST
const addPost = () => {
  const { config, user } = setUser()

  const addPostFn = async (data, type) => {
    if (sem.canAddPost) {
      sem.canAddPost = false
      try {
        const formData = new FormData()
        if (data.tags) {
          let tags = ''
          data.tags.forEach((tag) => {
            tags += tag + ','
          })
          tags = tags.slice(0, -1)
          formData.append('tags', tags)
        }
        if (!data.badgeName) {
          throw new Error('User did not select any challenge')
        }
        if (!data.title) {
          throw new Error('User has not given title to the post')
        }
        if (!data.description) {
          throw new Error('User has not given any description')
        }

        console.log('Data from add post from UI', data)

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('badgeName', data.badgeName)
        formData.append('post', data.post)

        currentPost.value = formData
        // console.log("Data from add post", formData.get("title"));

        if (type === 'POST') {
          console.log('Running post request')
          const result = await api.post('/posts', formData, config.value)
          console.log('Response on adding post from backend', result)
          if (result.data.response.isStreakBroken) {
            toast.info(result.data.response.message)
            sem.canAddPost = true
            return 2
          }
          const postCreated = filterMyPost(
            result.data.response.postCreated,
            user
          )
          posts.mine.unshift(postCreated)
          latestPost.value = postCreated

          // no need to store
          currentPost.value = null
        } else if (type === 'PATCH') {
          if (data.postId) {
            const result = await api.patch(
              `/posts/${data.postId}`,
              formData,
              config.value
            )
            if (!result.data.response.update) {
              throw new Error(
                "Couldn't update the post try again after sometime😕"
              )
            }
          }
        }

        sem.canAddPost = true
        return 0
      } catch (error) {
        console.log('Error while sending post to the backend', error)
        err.value = error.message

        sem.canAddPost = true
        return 1
      }
    }
  }

  const restartPost = async () => {
    if (sem.canAddPost) {
      sem.canAddPost = false
      // console.log("Data to be sent as of now", currentPost.value);
      try {
        const result = await api.post(
          '/posts/restart',
          currentPost.value,
          config.value
        )

        const message = result.data?.response?.message
        if (message) toast.info(message)

        const postCreated = filterMyPost(
          result.data.response.postCreated,
          user
        )
        posts.mine.unshift(postCreated)
        latestPost.value = postCreated

        // no need to store
        currentPost.value = null
        sem.canAddPost = true
        return 0
      } catch (error) {
        console.log('Error while sending the post on restart', error)
        err.value =
          'Unable to upload a post right now. Try again after sometime! 🙄'
        sem.canAddPost = true
        return 1
      }
    }
  }

  const usePoints = async () => {
    if (sem.canAddPost) {
      sem.canAddPost = false
      // console.log("Data to be sent as of now", currentPost.value);
      try {
        const result = await api.post(
          '/posts/usePoints',
          currentPost.value,
          config.value
        )

        const message = result.data?.response?.message
        if (message) toast.info(message)

        const postCreated = filterMyPost(
          result.data.response.postCreated,
          user
        )
        posts.mine.unshift(postCreated)
        latestPost.value = postCreated

        // no need to store
        currentPost.value = null
        sem.canAddPost = true
        return 0
      } catch (error) {
        console.log('Error while sending the post on restart', error)
        err.value =
          'Unable to upload a post right now. Try again after sometime! 🙄'
        sem.canAddPost = true
        return 1
      }
    }
  }

  return { addPostFn, restartPost, usePoints }
}

// POST MODAL
const postModalFn = () => {
  const { user, config } = setUser()
  const route = useRoute()

  const assignIndex = (index) => (currIndex.value = index)

  const getCurrentPost = computed(() => {
    return route.name === 'generalPosts'
      ? fuse.general
          ? fuse.general[currIndex?.value]
          : null
      : route.name === 'myPosts'
        ? fuse.mine
            ? fuse.mine[currIndex?.value]
            : null
        : route.name === 'randomUserPosts'
          ? fuse.randomUser
              ? fuse.randomUser[currIndex?.value]
              : null
          : fuse.home
            ? fuse.home[currIndex?.value]
            : null
  })

  const getNextPost = () => {
    if (
      route.name === 'generalPosts' &&
      currIndex.value < fuse.general.length - 1
    ) {
      currIndex.value++
    } else if (
      route.name === 'myPosts' &&
      currIndex.value < fuse.mine.length - 1
    ) {
      currIndex.value++
    } else if (
      route.name === 'randomUserPosts' &&
      currIndex.value < fuse.randomUser.length - 1
    ) {
      currIndex.value++
    } else if (
      route.name === 'home' &&
      currIndex.value < fuse.home.length - 1
    ) {
      currIndex.value++
    }
    return getCurrentPost.value
  }

  const getPrevPost = () => {
    if (currIndex.value > 0) currIndex.value--
    return getCurrentPost.value
  }

  const openPost = (index) => (currIndex.value = index)

  const vote = async () => {
    if (sem.canVote) {
      sem.canVote = false
      const index = currIndex.value

      let toBeUpvoted = true

      for (let i = 0; i < getCurrentPost.value.upvotes.length; i++) {
        if (getCurrentPost.value.upvotes[i] === user.value.userId) {
          toBeUpvoted = false
        }
      }

      // If not yet upvoted
      if (toBeUpvoted) {
        try {
          if (getCurrentPost.value?.postId) {
            await api.post(
              '/posts/upvote',
              { postId: getCurrentPost.value.postId },
              config.value
            )
            if (route.name === 'generalPosts') {
              posts.general[index].upvotes.push(user.value.userId)
            } else if (route.name === 'myPosts') {
              posts.mine[index].upvotes.push(user.value.userId)
            } else if (route.name === 'randomUserPosts') {
              posts.randomUser[index].upvotes.push(user.value.userId)
            } else {
              posts.home[index].upvotes.push(user.value.userId)
            }
          }
        } catch (error) {
          console.log('Error while upvoting the post', err)
          err.value = 'Unable to upvote post 😑'
        }
      } else {
        // If already upvoted then downvote
        try {
          if (getCurrentPost.value?.postId) {
            await api.post(
              '/posts/removeUpvote',
              { postId: getCurrentPost.value.postId },
              config.value
            )
            // Removing the user from votes list

            if (route.name === 'generalPosts') {
              const rm = posts.general[index]?.upvotes?.indexOf(
                user.value.userId
              )
              posts.general[index]?.upvotes?.splice(rm, 1)
            } else if (route.name === 'myPosts') {
              const rm = posts.mine[index]?.upvotes?.indexOf(user.value.userId)
              posts.mine[index]?.upvotes?.splice(rm, 1)
            } else if (route.name === 'randomUserPosts') {
              const rm = posts.randomUser[index]?.upvotes?.indexOf(
                user.value.userId
              )
              posts.randomUser[index]?.upvotes?.splice(rm, 1)
            } else {
              const rm = posts.home[index]?.upvotes?.indexOf(user.value.userId)
              posts.home[index]?.upvotes?.splice(rm, 1)
            }
          }
        } catch (error) {
          console.log('Error while downvoting the post', error)
          err.value =
            'Unable to downvote the post. Must be some issue from our servers!🙄'
        }
      }
      sem.canVote = true
    }
  }

  const deletePost = async (postId) => {
    try {
      if (postId) {
        const result = await api.delete(`/posts/${postId}`, config.value)
        if (result.data?.response?.message) {
          toast.info(result.data.response.message)
          return 0
        }
        const outcome = result.data.response.deleted
        if (outcome && outcome === 1) {
          toast.info(
            "Post deleted successfully! Don't forget to add a new post to maintain your streak 😗. Refresh the page to see the changes"
          )
        }
      }
    } catch (error) {
      console.log('Error while deleting this post from backend', error)
      err.value = 'Some issue with deleting posts. Try again after sometime😣'
    }
  }

  return {
    getCurrentPost,
    getNextPost,
    getPrevPost,
    openPost,
    vote,
    assignIndex,
    deletePost
  }
}

// POST COMMENTS
const getComments = () => {
  const { config } = setUser()
  const comments = ref([])
  const route = useRoute()

  const loadComments = async () => {
    const id =
      route.name === 'generalPosts'
        ? fuse.general[currIndex?.value]?.postId
        : route.name === 'myPosts'
          ? fuse.mine[currIndex?.value]?.postId
          : route.name === 'randomUserPosts'
            ? fuse.randomUser[currIndex?.value]?.postId
            : route.name === 'home'
              ? fuse.home[currIndex?.value]?.postId
              : ''

    try {
      const res = await api.get(`/posts/getComments/${id}`, config.value)
      comments.value = res.data.comments
    } catch (error) {
      console.log(
        'Error while obtaining comments of the post from backend',
        error
      )
      err.value = 'Unable to load comments try again later 😖'
    }
  }

  const orderedComments = computed(() => {
    return comments.value.sort(sortByDate).map((comment) => {
      // If username is null make it anonymous
      comment.userName = validateUserName(
        comment.userName ? comment.userName : 'anonymous'
      )
      if (!comment.createdAt.includes('ago')) {
        comment.createdAt = timeAgo(new Date(), new Date(comment.createdAt))
        comment.updatedAt = timeAgo(new Date(), new Date(comment.updatedAt))
      }

      return comment
    })
  })

  const postComment = async (comment) => {
    if (sem.canComment) {
      sem.canComment = false
      const data = {
        comment,
        postId:
          route.name === 'generalPosts'
            ? fuse.general[currIndex?.value]?.postId
            : route.name === 'myPosts'
              ? fuse.mine[currIndex?.value]?.postId
              : route.name === 'randomUserPosts'
                ? fuse.randomUser[currIndex?.value]?.postId
                : fuse.home[currIndex?.value].postId
      }

      try {
        const res = await api.post('/posts/comments', data, config.value)
        comments.value.push(res.data.response)
      } catch (error) {
        console.log('Error while posting a comment to the post', error)
        err.value = "Couldn't save your comment. 😣"
      }
      sem.canComment = true
    }
  }

  const updateComment = async (commentId, comment) => {
    if (commentId) {
      try {
        await api.patch(
          `/posts/updateComment/${commentId}`,
          { comment },
          config.value
        )
        const indexOfComment = comments.value.findIndex(
          (obj) => obj.commentId === commentId
        )
        comments.value[indexOfComment].comment = comment
        toast.success('Comment has been updated!')
      } catch (error) {
        console.log('Error while updating the comment', error)
        err.value = error.message
      }
    }
  }

  const deleteComment = async (commentId) => {
    if (commentId) {
      try {
        await api.delete(`/posts/deleteComment/${commentId}`, config.value)
        comments.value = comments.value.filter(
          (obj) => obj.commentId !== commentId
        )
        toast.success('Comment deleted!')
      } catch (error) {
        console.log('Error while deleting the comment', error)
        err.value = error.message
      }
    }
  }

  return {
    orderedComments,
    loadComments,
    postComment,
    updateComment,
    deleteComment
  }
}

// POSTS OF A USER
const getPostsOfUser = () => {
  const { config } = setUser()
  const count = ref(POSTS_COUNT)

  const loadUserPosts = async (userId, user) => {
    if (userId) {
      try {
        const res = await api.get(`/posts/of/${userId}`, config.value)
        posts.randomUser = filterMyPosts(res.data.posts, user)
        fuse.randomUser = filterMyPosts(res.data.posts, user)
      } catch (error) {
        console.log(
          'Error while obtaining random user posts from backend',
          err
        )
        err.value =
          'Unable to load this users posts 😬 try again after sometime'
      }
    }
  }

  const randomUserPosts = computed(() => fuse.randomUser.slice(0, count.value))

  const loadMore = async () =>
    (count.value += fuse.randomUser.length < fuse.randomUser ? 0 : 8)

  return { randomUserPosts, loadUserPosts, loadMore }
}

// UTILS
const sortByPoints = (a, b) => b.points - a.points
const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
const sortByPostDate = (a, b) =>
  new Date(b.updatedDate) - new Date(a.updatedDate)

const isBlank = (str) => {
  const re = /^\s*$/
  return !str || re.test(str)
}

const filterPost = (posts) => {
  return posts
    .filter((post) => post !== null)
    .map((post) => {
      post.upvotes = post.upvotes ? post.upvotes : []
      post.username = validateUserName(
        post.username ? post.username : 'anonymous'
      )
      post.identicon = generateIdenticon(
        post.badgeName ? post.badgeName : 'unknown'
      )
      post.createDate = !post.createDate.includes('ago')
        ? timeAgo(new Date(), new Date(post.createDate))
        : post.createDate
      return post
    })
    .sort(sortByPoints)
}

const filterMyPosts = (posts, user) => {
  return posts
    .filter((post) => post !== null)
    .sort(sortByPostDate)
    .map((post) => {
      return filterMyPost(post, user)
    })
}

const filterMyPost = (post, user) => {
  try {
    if (post && user) {
      post.upvotes = post.upvotes ? post.upvotes : []
      post.points = user.value ? user.value.points : 0
      post.username = validateUserName(user.value?.userName)
      post.identicon = generateIdenticon(
        post.badgeName ? post.badgeName : 'anonymous'
      )
      post.createDate = !post.createDate?.includes('ago')
        ? timeAgo(new Date(), new Date(post.createDate))
        : post.createDate
      return post
    }
  } catch (error) {
    console.log('Error while filtering my post', error)
  }
}

const checkUserName = (username) => {
  const re = new RegExp(`^[a-z0-9_@./#&+-]{1,${USERNAME_LENGTH_LIMIT}}$`)
  return re.test(username)
}

const validateUserName = (username) => {
  if (!checkUserName(username)) {
    return username
      .substring(0, USERNAME_LENGTH_LIMIT)
      .toLowerCase()
      .replaceAll(' ', '_')
  }
  return username
}

// MASONRY
const resizing = () => {
  const resizeGridItem = (grid) => {
    if (grid) {
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      )
      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      )
      grid.style.gridAutoRows = 'auto'
      grid.style.alignItems = 'self-start'
      grid.querySelectorAll('.post').forEach((item) => {
        item.style.gridRowEnd = `span ${Math.ceil(
          (item.clientHeight + rowGap) / (rowHeight + rowGap)
        )}`
      })
      grid.removeAttribute('style')
    }
  }

  return { resizeGridItem }
}

export {
  resizing,
  getPosts,
  postModalFn,
  addPost,
  getComments,
  getLatestPost,
  myPostsFn,
  getPostsOfUser,
  checkUserName,
  validateUserName,
  originalPosts,
  updateFuse,
  isBlank,
  home,
  POSTS_COUNT
}
