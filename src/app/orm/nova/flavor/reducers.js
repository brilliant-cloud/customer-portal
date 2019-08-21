const flavors = (state = {loading: false, items: [], itemsById: {}}, action) => {
  switch(action.type) {
    case 'GET_FLAVORS_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_FLAVORS_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    default: {
      return state
    }
  }
};

export { flavors };