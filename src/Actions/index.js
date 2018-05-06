export const loginUser = token => {
  window.localStorage.setItem("token", token);
  return {
    type: 'LOGIN_USER',
    token
  }
}
