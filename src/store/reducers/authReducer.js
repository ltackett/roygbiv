const initialState = {
  error: null,
  loggedIn: false,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
    return {
      ...state,
      loading: true,
    }

    case 'AUTH_LOADED':
    return {
      ...state,
      loading: false,
    }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: null,
        loggedIn: true,
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.error,
        loggedIn: false,
      }

    case 'LOGOUT':
    return {
      ...state,
      error: null,
      loggedIn: false,
    }

    default: return state
  }
}

export default authReducer
