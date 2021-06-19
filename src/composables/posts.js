import api from '@/api.js'
import { computed, ref, watch, watchEffect } from 'vue'
import { setUser } from './auth'
import { generateIdenticon, timeAgo } from '@/generate.js'
import { filter } from './filter'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import Fuse from 'fuse.js'

// Fuse Syntax
// generalFuse.value.search("plant 1 tree")[0].item.badgeName

const POSTS_COUNT = 8

const generalPosts = ref([])
const myPosts = ref([])
const postsOfAUser = ref([])
const latestPost = ref(null)
const currIndex = ref(0)
const count = ref(POSTS_COUNT)
const toast = useToast()

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

// LATEST POST
const getLatestPost = () => {
  const { config, user } = setUser()

  const temporaryPost = () => {
    return {
      description:
        'No Latest Post yet! Well, this is the beginning of your journey why not add some posts ✏ and see what other think about it 🤔. Pick out any challenge you like and work on it🔥',
      image: ['https://i.imgur.com/HuNalGN.png']
    }
  }

  const updateLatestPost = async () => {
    try {
      latestPost.value = temporaryPost()
      const res1 = await api.get('/posts/mypost/myLatestPost', config.value)
      const myLatestPost = filterMyLatestPost(res1.data, user)
      latestPost.value = myLatestPost
    } catch (error) {
      console.log('Error while obtaining latest post from backend')
    }
  }
  return { updateLatestPost, latestPost }
}

// GENERAL POSTS
const getPosts = () => {
  // To reset the count to 8
  count.value = POSTS_COUNT
  const { generalFilter } = filter()
  const { config } = setUser()
  const filtered = ref([])
  const error = ref(null)
  const generalFuse = ref(null)

  const options = {
    keys: ['title', 'description', 'badgeName']
  }

  watch(error, () => toast.error(error.value))

  const loadPosts = async () => {
    try {
      const res2 = await api.get(
        `/posts/allLatestPosts/${count.value}`,
        config.value
      )
      const latestPosts = filterPost(res2.data.posts)
      console.log('General Posts', latestPosts)
      generalPosts.value = latestPosts
      filtered.value = latestPosts
      generalFuse.value = new Fuse(generalPosts.value, options)

      console.log(
        'general fuse value',
        generalFuse.value.search('plant 1 tree')[0].badgeName
      )
    } catch (error) {
      console.log('Error while receiving latest posts from backend', error)
    }
  }

  const loadMore = async () => {
    // console.log("Loading more posts for you :)");
    count.value += generalPosts.value.length < count.value ? 0 : 8
    if (generalFilter.value.badgeName === 'All Badges') await loadPosts()
    else await loadBadgeGeneralPosts()
  }

  const loadBadgeGeneralPosts = async () => {
    if (generalFilter.value?.badgeId) {
      try {
        const res = await api.get(
          `/posts/postsByBadgeName/${generalFilter.value.badgeId}/${count.value}`,
          config.value
        )
        filtered.value = filterPost(res.data.posts)
      } catch (err) {
        if (err.s) {
          console.log(
            'Error while obtaining badge specific general posts from backend',
            err
          )
        }
        error.value = 'No such posts found!'
      }
    }
  }

  watchEffect(async () => {
    if (generalFilter.value.badgeName === 'All Badges') {
      filtered.value = generalPosts.value.splice(0, count.value)
    } else {
      await loadBadgeGeneralPosts()
    }
  })

  return { loadPosts, loadMore, filtered }
}

// MY POSTS
const myPostsFn = () => {
  count.value = 6
  const { config, user } = setUser()
  const { myPostsFilter } = filter()
  const filtered = ref([])
  const error = ref(null)

  watch(error, () => toast.error(error.value))

  const loadMyPosts = async () => {
    console.log('Getting config from user', config.value)

    try {
      const res = await api.get(`/posts/of/${user.value.userId}`, config.value)
      const myposts = filterMyPosts(res.data.posts, user)
      console.log('my posts', myposts)
      myPosts.value = myposts
      filtered.value = myposts
    } catch (err) {
      console.log('Error while receiving latest posts from backend', err)
    }
  }

  const loadBadgeMyPosts = async () => {
    if (myPostsFilter.value?.badgeId) {
      try {
        const res = await api.get(
          `/posts/postsByBadgeName/${myPostsFilter.value.badgeId}/${count.value}`,
          config.value
        )
        filtered.value = filterMyPosts(res.data.posts, user)
      } catch (err) {
        console.log(
          'Error while obtaining badge specific general posts from backend',
          err
        )
        error.value =
          'Error while loading your posts. Try again after sometime!'
      }
    }
  }

  watchEffect(async () => {
    if (myPostsFilter.value.badgeName === 'All Badges') {
      filtered.value = myPosts.value.splice(0, count.value)
    } else {
      await loadBadgeMyPosts()
    }
  })

  const loadMore = async () => {
    count.value += 6
    if (myPostsFilter.value.badgeName === 'All Badges') await loadMyPosts()
    else await loadBadgeMyPosts()
  }

  return { filtered, loadMore, loadMyPosts }
}

// ADD POST
const addPostFn = async (data) => {
  const { config, user } = setUser()
  const error = ref(null)

  watch(error, () => toast.error(error.value))

  try {
    const formData = new FormData()
    if (data.tags) {
      let tags = ''
      data.tags.forEach((tag) => {
        tags += tag + ','
      })
      data.tags = tags.slice(0, -1)
      formData.append('tags', data.tags)
    }

    if (!data.title) {
      throw new Error('User has not given title to the post')
    }
    if (!data.description) {
      throw new Error('User has not given any description')
    }
    if (!data.badgeName) {
      throw new Error('User did not select any challenge')
    }

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('badgeName', data.badgeName)

    console.log('Data from add post', data)

    const result = await api.post('/posts', formData, config.value)
    console.log('result', result)

    const postCreated = result.data.response.postCreated

    console.log('postCreated', postCreated)
    generalPosts.value.push(postCreated)
    myPosts.value.unshift(postCreated)
    latestPost.value = filterMyLatestPost(postCreated, user)

    return 0
  } catch (err) {
    console.log('Error while sending post to the backend', err)
    error.value = err
    return 1
  }
}

// POST MODAL
const postModalFn = () => {
  const { user, config } = setUser()
  const route = useRoute()
  const error = ref(null)

  watch(error, () => toast.error(error.value))

  const assignIndex = (index) => (currIndex.value = index)

  const getCurrentPost = computed(() => {
    return route.path === '/'
      ? generalPosts.value
          ? generalPosts.value[currIndex?.value]
          : null
      : route.path === '/posts'
        ? myPosts.value
            ? myPosts.value[currIndex?.value]
            : null
        : postsOfAUser.value
          ? postsOfAUser.value[currIndex?.value]
          : null
  })

  const getNextPost = () => {
    if (route.path === '/' && currIndex.value < generalPosts.value.length - 1) {
      currIndex.value++
    } else if (
      route.path === '/posts' &&
      currIndex.value < myPosts.value.length - 1
    ) {
      currIndex.value++
    } else if (
      route.path === `/posts/${route.params.userId}` &&
      currIndex.value < postsOfAUser.value.length - 1
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
    const index = currIndex.value
    const post = getCurrentPost.value
    const postId = post.postId

    let toBeUpvoted = true

    for (let i = 0; i < post.upvotes.length; i++) {
      if (post.upvotes[i] === user.value.userId) {
        toBeUpvoted = false
      }
    }

    // If not yet upvoted
    if (toBeUpvoted) {
      try {
        await api.post('/posts/upvote', { postId }, config.value)

        if (route.path === '/') {
          generalPosts.value[index].upvotes.push(user.value.userId)
        } else if (route.path === '/posts') {
          myPosts.value[index].upvotes.push(user.value.userId)
        } else postsOfAUser.value[index].upvotes.push(user.value.userId)
      } catch (err) {
        console.log('Error while upvoting the post', err)
        error.value = err
      }
    } else {
      // If already upvoted then downvote
      try {
        await api.post('/posts/removeUpvote', { postId }, config.value)
        // Removing the user from votes list

        if (route.path === '/') {
          const rm = generalPosts.value[index]?.upvotes?.indexOf(
            user.value.userId
          )
          generalPosts.value[index]?.upvotes?.splice(rm, 1)
        } else if (route.path === '/posts') {
          const rm = myPosts.value[index]?.upvotes?.indexOf(user.value.userId)
          myPosts.value[index]?.upvotes?.splice(rm, 1)
        } else {
          const rm = postsOfAUser.value[index]?.upvotes?.indexOf(
            user.value.userId
          )
          postsOfAUser.value[index]?.upvotes?.splice(rm, 1)
        }
      } catch (err) {
        console.log('Error while downvoting the post', error)
        error.value = err
      }
    }
  }

  return {
    getCurrentPost,
    getNextPost,
    getPrevPost,
    openPost,
    vote,
    assignIndex
  }
}

// POST COMMENTS
const getComments = () => {
  const { config } = setUser()
  const comments = ref([])
  const route = useRoute()

  const loadComments = async () => {
    const id =
      route.path === '/'
        ? generalPosts?.value[currIndex?.value]?.postId
        : route.path === '/posts'
          ? myPosts?.value[currIndex?.value]?.postId
          : postsOfAUser?.value[currIndex?.value].postId

    try {
      const res = await api.post(`/posts/getPost/${id}`, {}, config.value)
      comments.value = res.data.comments
    } catch (error) {
      console.log(
        'Error while obtaining comments of the post from backend',
        error
      )
    }
  }

  const orderedComments = computed(() => {
    return comments.value.sort(sortByDate).map((comment) => {
      // If username is null make it anonymous
      if (comment.userName === null) comment.userName = 'anonymous'

      if (!comment.createdAt.includes('ago')) {
        comment.createdAt = timeAgo(new Date(), new Date(comment.createdAt))
        comment.updatedAt = timeAgo(new Date(), new Date(comment.updatedAt))
      }

      return comment
    })
  })

  const postComment = async (comment) => {
    const data = {
      comment,
      postId:
        route.path === '/'
          ? generalPosts?.value[currIndex?.value]?.postId
          : myPosts?.value[currIndex?.value]?.postId
    }

    try {
      const res = await api.post('/posts/comments', data, config.value)
      comments.value.push(res.data.response)
    } catch (error) {
      console.log('Error while posting a comment to the post', error)
    }
  }

  return { loadComments, orderedComments, postComment }
}

// POSTS OF A USER
const getPostsOfUser = () => {
  const { config } = setUser()
  const count = ref(6)
  const err = ref(null)

  watch(err, () => toast.error(err.value))

  const loadMore = () => (count.value += 6)

  const loadUserPosts = async (userId, username) => {
    if (userId) {
      try {
        console.log('username', username)
        const res = await api.get(`/posts/of/${userId}`, config.value)
        console.log('Response of posts of that user from backend', res)
        postsOfAUser.value = res.data.posts.map((post) => {
          post.username = username || 'anonymous'
          post.upvotes = post.upvotes ? post.upvotes : []
          post.identicon = generateIdenticon(post.badgeName)
          post.createDate = timeAgo(new Date(), new Date(post.createDate))
          post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate))
          return post
        })
      } catch (error) {
        console.log(
          'Error while obtaining random user posts from backend',
          err
        )
        err.value = error
      }
    }
  }

  const randomUserPosts = computed(() =>
    postsOfAUser.value.slice(0, count.value)
  )

  return { randomUserPosts, loadUserPosts, loadMore }
}

// UTILS
const sortByPoints = (a, b) => b.points - a.points
const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
const sortByPostDate = (a, b) =>
  new Date(b.updatedDate) - new Date(a.updatedDate)

const filterPost = (posts) => {
  return posts
    .filter((post) => post !== null)
    .map((post) => {
      post.upvotes = post.upvotes ? post.upvotes : []
      post.username = post.username ? post.username : 'anonymous'
      post.identicon = generateIdenticon(post.badgeName)
      post.createDate = timeAgo(new Date(), new Date(post.createDate))
      post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate))
      return post
    })
    .sort(sortByPoints)
}

const filterMyPosts = (posts, user) => {
  return posts
    .filter((post) => post !== null)
    .sort(sortByPostDate)
    .map((post) => {
      const username = user.value.userName
      post.upvotes = post.upvotes ? post.upvotes : []
      post.username = username || 'anonymous'
      post.identicon = generateIdenticon(post.badgeName)
      post.createDate = timeAgo(new Date(), new Date(post.createDate))
      post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate))
      post.points = user.value.points ? user.value.points : 0
      return post
    })
}

const filterMyLatestPost = (post, user) => {
  try {
    post.upvotes = post.upvotes ? post.upvotes : []
    post.points = post.points ? post.points : 0
    post.userName = user.value.userName
    post.createDate = timeAgo(new Date(), new Date(post.createDate))
    return post
  } catch (error) {
    console.log('Error while filtering the latest post', error)
  }
}

export {
  resizing,
  getPosts,
  postModalFn,
  addPostFn,
  getComments,
  getLatestPost,
  myPostsFn,
  getPostsOfUser
}
