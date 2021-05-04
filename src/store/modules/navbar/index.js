const state = {
  generalPostsFilter: 'All',
  myPostsFilter: 'All',
  generalPosts: [],
  myPosts: []
}

const mutations = {
  SET_GENERAL_POSTS_FILTER (state, payload) {
    console.log('Setting general Posts', payload)
    state.generalPostsFilter = payload
  },
  SET_MY_POSTS_FILTER (state, payload) {
    state.myPostsFilter = payload
  },
  SET_GENERAL_POSTS (state, payload) {
    state.generalPosts = payload
  }
}

// const getters = {
//   generalPosts(state){

//   }
// }

const actions = {
  setGeneralPostsFilter (context, payload) {
    context.commit('SET_GENERAL_POSTS_FILTER', payload)
  },
  setMyPostsFilter (context, payload) {
    context.commit('SET_MY_POSTS_FILTER', payload)
  },
  setGeneralPosts (context, payload) {
    context.commit('SET_GENERAL_POSTS', payload)
  }
}

const navbarModule = {
  state,
  mutations,
  actions
}

export default navbarModule
