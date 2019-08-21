const securityGroups = (state = { loading: false, items: [], itemsById: {} }, action) => {
  switch(action.type) {
    case 'GET_SECURITY_GROUPS_SUCCESS':{
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_SECURITY_GROUPS_REQUEST': {
      return {
        loading: true
      }
    }

    default: {
      return state;
    }
  }
};

export { securityGroups };