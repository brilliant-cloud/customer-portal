const images = (state = {loading: false, items: [], itemsById: {}}, action) => {
  switch(action.type) {
    case 'GET_IMAGES_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_IMAGES_REQUEST': {
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

export {
  images
};