const servers = (state = {loading: false, items:[], itemsById: {}}, action) => {
  switch (action.type) {
    case 'GET_SERVERS_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_SERVERS_SUCCESS': {
      return {
        ...state,
        loading: false,
        items: action.items,
        itemsById: action.itemsById,
      }
    }

    case 'UPDATE_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'UPDATE_SERVER_SUCCESS': {
      let itemsById = {
        ...state.itemsById
      };
      itemsById[action.server.id] = action.server;
      return {
        ...state,
        loading: false,
        itemsById,
      }
    }

    case 'CREATE_SERVER_SUCCESS': {
      let itemsById = {
        ...state.itemsById,
      };
      itemsById[action.server.id] = action.server;
      return {
        ...state,
        items: [action.server.id, ...state.items],
        itemsById,
      }
    }

    case 'POLL_SERVER_INFO_SUCCESS': {
      let itemsById = {
        ...state.itemsById,
      };
      itemsById[action.server.id] = action.server;
      return {
        ...state,
        itemsById,
      }
    }

    case 'POLL_OPERATE_SERVER_SUCCESS': {
      let itemsById = {
        ...state.itemsById,
      };
      itemsById[action.server.id] = action.server;
      return {
        ...state,
        itemsById,
      }
    }

    case 'OPERATE_SERVER_SUCCESS': {
      return state
    }

    default: {
      return state
    }
  }
};

const server = (state = {loading: false, data: {}}, action) => {
  switch (action.type) {
    case 'GET_SERVER_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'GET_SERVER_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.server,
      }
    }

    default: {
      return state
    }
  }
};

const consoleOutput = (state = {loading: false, data: ''}, action) => {
  switch (action.type) {
    case 'FETCH_CONSOLE_OUTPUT_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.output
      }
    }

    case 'FETCH_CONSOLE_OUTPUT_REQUEST': {
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
  servers,
  server,
  consoleOutput,
};