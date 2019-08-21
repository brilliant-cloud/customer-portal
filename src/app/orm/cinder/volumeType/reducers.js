const volumeTypes = (state = {loading: false, items: [], itemsById: {} }, action) => {
  switch(action.type) {
    case 'GET_VOLUME_TYPES_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_VOLUME_TYPES_REQUEST': {
      return {
        loading: true
      }
    }

    default: {
      return state;
    }
  }
};

export { volumeTypes };