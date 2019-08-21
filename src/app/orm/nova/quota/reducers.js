const quotaSet = (state = {loading: false, data: {}}, action) => {
  switch (action.type) {
    case 'GET_PROJECT_QUOTA_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_PROJECT_QUOTA_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.quotaSet,
      }
    }

    default: {
      return state;
    }
  }
};

export {
  quotaSet,
};
