const initState = {
  isLoggedIn: !!localStorage.getItem('test:access_token'),
  LoggedInUser: JSON.parse(localStorage.getItem('test:LoggedInUser')),
  userType: localStorage.getItem('test:userType')
}

export default initState
