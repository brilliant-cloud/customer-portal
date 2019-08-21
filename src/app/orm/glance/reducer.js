import { combineReducers } from 'redux';
import { images } from 'app/orm/glance/image/reducers';

const glance = combineReducers({
  images,
});

export default glance;
