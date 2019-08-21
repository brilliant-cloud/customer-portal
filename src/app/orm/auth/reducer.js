import { combineReducers } from 'redux';
import { login } from 'app/orm/auth/login/reducers';

const auth = combineReducers({
  login
});

export default auth;
