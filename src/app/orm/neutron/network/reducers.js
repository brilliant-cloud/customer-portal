const networks = (state = { loading: false, items: [], itemsById: {} }, action) => {
  switch (action.type) {
    case 'GET_NETWORKS_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_NETWORKS_REQUEST': {
      return {
        loading: true,
      }
    }

    default: {
      return state;
    }
  }
};

export { networks };