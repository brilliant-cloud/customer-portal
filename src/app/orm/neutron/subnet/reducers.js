const subnets = (state = {loading: false, items: [], itemsById: {} }, action) => {
  switch (action.type) {
    case 'GET_SUBNETS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_SUBNETS_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    default: {
      return state;
    }
  }
};

export { subnets };
