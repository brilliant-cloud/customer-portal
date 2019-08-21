import { combineReducers } from 'redux';

const notifications = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_SERVER_SUCCESS': {
      return [...state, action.notification]
    }

    case 'POLL_SERVER_INFO_SUCCESS': {
      let notificationIndex = state.findIndex(ele => ele.id === action.server.id);
      let newState = [...state];
      newState[notificationIndex].payload = action.server;

      if (['ACTIVE', 'ERROR'].indexOf(action.server.status) !== -1) {
        newState[notificationIndex].willChange = false;
      }
      return newState;
    }

    case 'CLOSE_NOTIFICATION': {
      let notificationIndex = state.findIndex(ele => ele.id === action.id);
      let newState = [...state];
      newState.splice(notificationIndex, 1);
      return newState;
    }

    default: {
      return state;
    }
  }
};

const console = combineReducers({
  notifications
});

export default console;
