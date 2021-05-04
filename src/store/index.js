import { createStore } from 'vuex'
import authentication from './modules/authentication'
import navbar from './modules/navbar'
import user from './modules/currentUser'

const store = createStore({
  modules: {
    auth: authentication,
    nav: navbar,
    user: user
  }
})

export default store
