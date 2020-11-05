import * as types from './types'

const mutations = {
  [types.SET_LOGGEDIN_USER] (state, payload) {
    localStorage.setItem('yenna:LoggedInUser', JSON.stringify(payload))
    state.LoggedInUser = Object.assign({}, payload)
  },
  [types.SET_LOGIN_STATUS] (state, payload) {
    state.isLoggedIn = payload
  },
  [types.SET_LOGGEDIN_USER_TYPE] (state, payload) {
    state.userType = payload
  }
}
export default mutations
