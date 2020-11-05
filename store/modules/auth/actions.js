import * as types from './types'
export default {
  setUser (context, payload) {
    localStorage.setItem('test:access_token', payload.token)
    localStorage.setItem('test:userType', payload.loginDetails.type)
    context.commit(types.SET_LOGIN_STATUS, true)
    context.commit(types.SET_LOGGEDIN_USER, payload.loginDetails)
    context.commit(types.SET_LOGGEDIN_USER_TYPE, payload.loginDetails.type)
  },
  resetUser ({ commit }) {
    localStorage.removeItem('test:access_token')
    localStorage.removeItem('test:userType')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_LOGGEDIN_USER, null)
    commit(types.SET_LOGGEDIN_USER_TYPE, null)
  }
}
