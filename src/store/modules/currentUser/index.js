const state = {
  user: {}
}

const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  CLEAR_USER (state) {
    state.user = {}
  }
}

const actions = {
  setUser (context, payload) {
    context.commit('SET_USER', payload)
  },
  clearUser (context) {
    context.commit('CLEAR_USER')
  }
}

const userModule = {
  state,
  mutations,
  actions
}

export default userModule
