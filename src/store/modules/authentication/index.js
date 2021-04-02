const state = {
  isAuthenticated: false
}

const mutations = {
  AUTHENTICATE_USER (state) {
    state.isAuthenticated = true
  },
  SIGN_OUT_USER (state) {
    state.isAuthenticated = false
  }
}

const actions = {
  authenticateUser (context) {
    context.commit('AUTHENTICATE_USER')
  },
  signOutUser (context) {
    context.commit('SIGN_OUT_USER')
  }
}

const authenticationModule = {
  state,
  mutations,
  actions
}

export default authenticationModule
