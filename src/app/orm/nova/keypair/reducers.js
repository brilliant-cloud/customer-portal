const keypairs = (state = {loading: false, items: [], itemsById: {} }, action) => {
  switch(action.type) {
    case 'GET_KEYPAIRS_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_KEYPAIRS_REQUEST': {
      return {
        loading: true,
      }
    }

    default: {
      return state
    }
  }
};

export {
  keypairs,
};