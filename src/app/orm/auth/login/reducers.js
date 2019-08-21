const initialState = {
  isLogged: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return state
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLogged: true,
      }
    }

    case 'LOGOUT_REQUEST': {
      return state
    }

    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        isLogged: false
      }
    }

    case 'LOAD_TOKEN_DATA_REQUEST': {
      return {
        ...state,
        isLogged: false
      }
    }

    case 'LOAD_TOKEN_DATA_SUCCESS': {
      return {
        ...state,
        isLogged: true,
      }
    }
    
    default: {
      return state
    }
  }
};

export { login };