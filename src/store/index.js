import { createStore } from 'vuex'
import authentication from './modules/authentication'

const store = createStore({
  modules: {
    auth: authentication
  }
})

export default store
