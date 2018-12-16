export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    dispatch({ type: 'AUTH_LOADING' })
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
      dispatch({ type: 'AUTH_LOADED' })
    }).catch((error) => {
      dispatch({ type: 'LOGIN_ERROR', error })
      dispatch({ type: 'AUTH_LOADED' })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    dispatch({ type: 'AUTH_LOADING' })
    firebase.auth().signOut().then(() => {
      // Wait one frame before dispatching logout to prevent race condition
      setTimeout(() => {
        dispatch({ type: 'LOGOUT' })
        dispatch({ type: 'AUTH_LOADED' })
      });
    })
  }
}
