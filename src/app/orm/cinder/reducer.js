import { combineReducers } from 'redux';
import { volumes } from 'app/orm/cinder/volume/reducers';
import { volumeTypes } from 'app/orm/cinder/volumeType/reducers';

const cinder = combineReducers({
  volumes,
  volumeTypes,
});

export default cinder;
