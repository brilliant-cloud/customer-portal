import { combineReducers } from 'redux';
import orm from 'app/reducers/orm';
import features from 'app/reducers/features';

const rootReducer = combineReducers({
  orm,
  features,
});

export default rootReducer;