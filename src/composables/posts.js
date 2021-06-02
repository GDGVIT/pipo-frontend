import api from '@/api.js'
import { computed, ref, watch } from 'vue'
import { setUser } from './auth'
import { generateIdenticon, timeAgo } from '@/generate.js'
import { filter } from './filter'
import { useRoute } from 'vue-router'

const generalPosts = ref(null)
const myPosts = ref(null)
const postsOfAUser = ref([])
const latestPost = ref(null)
const currIndex = ref(0)
const count = ref(8)

// MASONRY
const resizing = () => {
  const resizeGridItem = (grid) => {
    if (grid) {
      // console.log("grid", grid);

      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      )

      // console.log("Row Height", rowHeight);

      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      )

      // console.log("Row Gap", rowGap);

      grid.style.gridAutoRows = 'auto'
      grid.style.alignItems = 'self-start'

      // console.log(grid.querySelectorAll(".post"));

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

  const updateLatestPost = async () => {
    try {
      console.log('Setting latest post initially')
      // initially
      latestPost.value = {
        description:
          'No Latest Post yet! Well, this is the beginning of your journey why not add some posts ✏ and see what other think about it 🤔. Pick out any challenge you like and work on it🔥',
        image: []
      }
      const res1 = await api.get('/posts/myLatestPost', config.value)
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
  count.value = 8

  const { generalFilter } = filter()

  const loadPosts = async () => {
    const { config } = setUser()

    // console.log("Getting config from user", config.value);

    try {
      const res2 = await api.get(
        `/posts/allLatestPosts/${count.value}`,
        config.value
      )

      const latestPosts = res2.data.posts
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

      console.log('General Posts', latestPosts)

      generalPosts.value = latestPosts
    } catch (error) {
      console.log('Error while receiving latest posts from backend', error)
    }
  }

  const loadMore = async () => {
    // console.log("Loading more posts for you :)");
    count.value += generalPosts.value.length < count.value ? 0 : 8
    await loadPosts()
  }

  const filtered = computed(() => {
    return generalPosts.value?.filter((post) =>
      generalFilter.value === 'All Badges'
        ? true
        : post.badgeName === generalFilter.value
    )
  })

  return { loadPosts, loadMore, filtered }
}

// MY POSTS
const myPostsFn = () => {
  count.value = 6

  const { myPostsFilter } = filter()

  const loadMyPosts = async () => {
    if (!myPosts.value) {
      const { config, user } = setUser()

      console.log('Getting config from user', config.value)

      try {
        const res = await api.get(
          `/posts/of/${user.value.userId}`,
          config.value
        )

        const myposts = res.data.posts
          .filter((post) => post !== null)
          .sort(sortByPostDate)
          .map((post) => {
            const username = user.value.userName
            post.upvotes = post.upvotes ? post.upvotes : []
            post.username = username || 'anonymous'

            post.identicon = generateIdenticon(post.badgeName)

            post.createDate = timeAgo(new Date(), new Date(post.createDate))
            post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate))

            // TODO: My posts doesn't have points yet
            post.points = 20

            return post
          })

        console.log('my posts', myposts)

        myPosts.value = myposts
      } catch (error) {
        console.log('Error while receiving latest posts from backend', error)
      }
    }
  }

  const filtered = computed(() => {
    return myPosts.value
      ?.slice(0, count.value)
      .filter((post) =>
        myPostsFilter.value === 'All Badges'
          ? true
          : post.badgeName === myPostsFilter.value
      )
  })

  const loadMore = () => {
    count.value += 6
  }

  return { filtered, loadMore, loadMyPosts }
}

// ADD POST
const addPostFn = async (data) => {
  const { config, user } = setUser()
  const error = ref(null)

  console.log('Data from add post', data)

  watch(error, () => window.alert(error.value))

  try {
    const formData = new FormData()
    // TODO: Add tags later
    // if (data.tags) formData.append("tags", data.tags);

    if (!data.title) {
      throw new Error('User has not given title to the post')
    }
    if (!data.description) {
      throw new Error('User has not given any description')
    }
    if (!data.badgeName) {
      throw new Error('User did not select any challenge')
    }
    if (!data.post) {
      throw new Error('User did not select any picture')
    }

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('badgeName', data.badgeName)

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

    let toBeUpvoted = true

    for (let i = 0; i < post.upvotes.length; i++) {
      if (post.upvotes[i] === user.userId) {
        toBeUpvoted = false
        break
      }
    }

    if (toBeUpvoted) {
      console.log('User has not yet upvoted')
      try {
        const postId = post?.postId
        const res = await api.post('/posts/upvote', { postId }, config.value)
        // TODO: Currently not upvoting check it once
        console.log(res.data)
      } catch (error) {
        console.log('Error while upvoting the post', error)
      }
      generalPosts.value[index].upvotes.push(user.value.userId)
    } else {
      console.log('User has already upvoted!')
      try {
        const postId = post?.postId
        const res = await api.post(
          '/posts/remoteUpvote',
          { postId },
          config.value
        )
        // TODO: Currently not downvoting check it once
        console.log(res.data)
      } catch (error) {
        console.log('Error while upvoting the post', error)
      }

      generalPosts.value[index].upvotes = generalPosts.value[
        index
      ].upvotes.filter((post) => post.id !== user.value.userId)
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

  watch(err, () => window.alert(err))

  const loadMore = () => (count.value += 6)

  const loadUserPosts = async (userId, username) => {
    try {
      const res = await api.get(`/posts/of/${userId}`, config.value)
      console.log('Response of posts of that user from backend', res)
      postsOfAUser.value = res.data.posts.map((post) => {
        post.username = username || 'Anonymous'
        post.upvotes = post.upvotes ? post.upvotes : []
        post.identicon = generateIdenticon(post.badgeName)
        post.createDate = timeAgo(new Date(), new Date(post.createDate))
        post.updatedDate = timeAgo(new Date(), new Date(post.updatedDate))
        return post
      })
    } catch (error) {
      console.log('Error while obtaining random user posts from backend', err)
      err.value = error
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

const filterMyLatestPost = (post, user) => {
  try {
    if (post.upvotes === null) post.upvotes = []
    post.points = post.points ? post.points : 20
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
