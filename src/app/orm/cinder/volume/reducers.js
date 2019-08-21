const volumes = (state = {loading: false, items: [], itemsById: {} }, action) => {
  switch(action.type) {
    case 'GET_VOLUMES_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'GET_VOLUMES_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'CREATE_VOLUME_SUCCESS': {
      return {
        ...state,
        items: [action.volume.id, ...state.items],
        itemsById: {
          ...state.itemsById,
          [action.volume.id]: action.volume,
        }
      }
    }

    //
    case 'POLL_VOLUME_SUCCESS':
    case 'UPDATE_VOLUME_SUCCESS':
    case 'GET_VOLUME_SUCCESS':
    case 'POLL_VOLUME_IF_DELETED_FAILURE': {
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.volume.id]: action.volume
        }
      }
    }

    case 'POLL_VOLUME_IF_DELETED_SUCCESS': {
      let itemsById = {...state.itemsById};
      let items = [...state.items];
      let index = items.indexOf(action.volume.id);
      if (index !== -1) {
        items.splice(index, 1);
        delete itemsById[action.volume.id]
      }

      return {
        ...state,
        items,
        itemsById,
      };
    }

    case 'DELETE_VOLUME_SUCCESS':
    case 'RESIZE_VOLUME_SUCCESS': {
      return state;
    }

    default: {
      return state;
    }
  }
};

export { volumes  }
