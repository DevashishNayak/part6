const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.message
      default:
        return state
    }
  }

  export const notificationChange = (message, time) => {
    return async dispatch => {
      await dispatch({
        type: 'SET_MESSAGE',
        message,
      })
      clearTimeout(parseInt(localStorage.getItem('timeoutID')))
      const timeoutID = setTimeout(() => dispatch({ type: 'SET_MESSAGE', message: null }), time*1000)
      localStorage.setItem('timeoutID', String(timeoutID))
    }
  }

  export default notificationReducer