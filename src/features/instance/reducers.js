import { combineReducers } from 'redux';

const initialCreateState = {
  choosedNetworks: [],
  choosedSecurityGroup: [],
  choosedImage: '',
  choosedFlavor: '',
  choosedKeypair: '',
  filledInstance: '',
};

const create = (state = initialCreateState, action) => {
  switch(action.type) {
    case 'ADD_NETWORK': {
      return {
        ...state,
        choosedNetworks: [...state.choosedNetworks, action.id]
      }
    }

    case 'REMOVE_NETWORK': {
      let index = state.choosedNetworks.findIndex(ele => ele === action.id);
      let choosedNetworks = [...state.choosedNetworks];
      choosedNetworks.splice(index, 1);
      return {
        ...state,
        choosedNetworks,
      }
    }

    case 'CHOOSED_SECURITY_GROUP': {
      return {
        ...state,
        choosedSecurityGroup: action.nameArrs
      }
    }

    case 'CHOOSED_IMAGE': {
      return {
        ...state,
        choosedImage: action.id
      }
    }

    case 'CHOOSED_FLAVOR': {
      return {
        ...state,
        choosedFlavor: action.id
      }
    }

    case 'CHOOSED_KEYPAIR': {
      return {
        ...state,
        choosedKeypair: action.name
      }
    }

    case 'FILLED_INSTANCE': {
      return {
        ...state,
        filledInstance: action.name
      }
    }

    default: {
      return state;
    }
  }
};

const timeSpan = (state = '1hour', action) => {
  switch(action.type) {
    case 'FILTER_TIME_SPAN': {
      return action.timeSpan
    }

    default: {
      return state
    }
  }
};

const choosedInstance = (state = {selectedRows: []}, action) => {
  switch(action.type) {
    case 'CHOOSED_INSTANCE': {
      return {
        ...state,
        selectedRows: action.selectedRows
      }
    }

    default: {
      return state
    }
  }
};

const instance = combineReducers({
  create,
  timeSpan,
  choosedInstance
});

export default instance
