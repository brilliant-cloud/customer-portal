const routers = (state = {loading: false, items: [], itemsById: {} }, action) => {
  switch (action.type) {
    case 'GET_ROUTERS_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_ROUTERS_SUCCESS': {
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

const router = (state = {loading: false, data: {}}, action) => {
  switch (action.type) {
    case 'GET_ROUTER_REQUEST': {
      return {
        ...state,
        loading: true
      }
    }

    case 'GET_ROUTER_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.router
      }
    }

    default: {
      return state;
    }
  }
};

export { routers, router };