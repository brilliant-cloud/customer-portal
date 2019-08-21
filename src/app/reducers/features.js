import { combineReducers } from 'redux';
import volume from 'features/volume/reducers';
import instance from 'features/instance/reducers';
import console from 'features/console/reducers';

const features = combineReducers({
  console,
  volume,
  instance,
});

export default features;

