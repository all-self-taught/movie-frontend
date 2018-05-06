
const initialState = {
  token: null
}

export const user = (state=initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
    return {
      token: action.token
    }
    default:
    return {
      token: state.token
    }
  }
}
