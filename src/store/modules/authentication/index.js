const state = {
  isAuthenticated: false,
  idToken: null,
  config: {
    headers: {
      Authorization: null
    }
  }
}

const mutations = {
  AUTHENTICATE_USER (state, payload) {
    // console.log("mutation", payload);
    state.isAuthenticated = true
    state.idToken = payload
    state.config.headers.Authorization = payload
  },
  SIGN_OUT_USER (state) {
    state.isAuthenticated = false
    state.idToken = null
  }
}

const actions = {
  authenticateUser (context, payload) {
    // console.log("context", payload);
    context.commit('AUTHENTICATE_USER', payload)
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
