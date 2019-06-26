export const state = () => ({
  auth: {
    loggedIn: false,
    user: null,
    token: ''
  }
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  token(state) {
    return state.auth.token
  }
}

export const mutations = {
  setLogin(state, { user, token }) {
    state.auth.loggedIn = true
    state.auth.user = user
    state.auth.token = token
  },
  logout(state) {
    state.auth.loggedIn = false
    state.auth.user = null
    state.auth.token = ''
  }
}
