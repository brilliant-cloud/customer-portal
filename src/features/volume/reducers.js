import { combineReducers } from 'redux';

const choosedVolumes = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_VOLUME': {
      return [...action.volume]
    }

    default: {
      return state;
    }
  }
};

const volume = combineReducers({
  choosedVolumes
});

export default volume;
