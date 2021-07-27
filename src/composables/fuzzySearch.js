import { readonly, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Fuse from 'fuse.js'
import { originalPosts, updateFuse } from '@/composables/posts'

const options = {
  includeMatches: true,
  threshold: 0.5,
  location: 0,
  distance: 500,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['badgeName', 'title', 'description', 'tags', 'username']
}

const { immutablePosts } = originalPosts()

const shouldFocus = ref(true)
const searchResultsVisible = ref(false)

const searchPosts = ref([])
const allPosts = ref([])
const query = ref('')

const fuzzySearch = () => {
  onBeforeRouteUpdate(() => {
    if (searchPosts.value) searchPosts.value = []
    searchResultsVisible.value = false
  })

  const {
    generalUpdate,
    myUpdate,
    randomUserUpdate,
    homeUpdate
  } = updateFuse()
  const route = useRoute()
  let fuse = null

  const setPosts = () => {
    if (route.name === 'generalPosts') allPosts.value = immutablePosts.general
    else if (route.name === 'myPosts') allPosts.value = immutablePosts.mine
    else if (route.name === 'randomUserPosts') {
      allPosts.value = immutablePosts.randomUser
    } else if (route.name === 'home') allPosts.value = immutablePosts.home
    fuse = new Fuse(allPosts.value, options)
  }

  const performSearch = () => {
    if (!fuse) fuse = new Fuse(allPosts.value, options)
    const result = fuse.search(query.value)
    if (Array.isArray(result)) {
      if (!query.value.length || query.value === '/all') {
        searchPosts.value = allPosts.value
      } else searchPosts.value = result.map((i) => i.item)
    }
  }

  const showAll = () => {
    searchPosts.value = allPosts.value
    fixSearch()
  }

  const fixSearch = () => {
    if (route.name === 'generalPosts') generalUpdate(searchPosts.value)
    else if (route.name === 'myPosts') myUpdate(searchPosts.value)
    else if (route.name === 'randomUserPosts') {
      randomUserUpdate(searchPosts.value)
    } else if (route.name === 'home') homeUpdate(searchPosts.value)
    query.value = ''
    searchResultsVisible.value = false
  }

  const showPost = (post) => {
    const p = []
    p.push(post)
    if (route.name === 'generalPosts') generalUpdate(p)
    else if (route.name === 'myPosts') myUpdate(p)
    else if (route.name === 'randomUserPosts') randomUserUpdate(p)
    else if (route.name === 'home') homeUpdate(p)
    query.value = ''
    searchResultsVisible.value = false
  }

  const showPostAtIndex = (index) => {
    if (query.value === '/all') {
      showAll()
    } else {
      showPost(searchPosts.value[index])
    }
    query.value = ''
  }

  const searches = readonly(searchPosts)

  return {
    query,
    searches,
    searchResultsVisible,
    performSearch,
    setPosts,
    fixSearch,
    showPost,
    showAll,
    showPostAtIndex
  }
}

const focusSearch = () => {
  const route = useRoute()

  const focus = readonly(shouldFocus)

  const updateShouldFocusSearch = (bool) => {
    shouldFocus.value = bool
  }

  watch(
    () => route.name,
    () => {
      const routeName = route.name

      if (
        routeName === 'generalPosts' ||
        routeName === 'myPosts' ||
        routeName === 'randomUserPosts' ||
        routeName === 'home'
      ) {
        shouldFocus.value = true
      } else {
        shouldFocus.value = false
      }
    }
  )

  return { focus, updateShouldFocusSearch }
}

export { focusSearch, fuzzySearch }
