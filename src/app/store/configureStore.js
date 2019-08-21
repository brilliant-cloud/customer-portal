import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'app/reducers/rootReducer';

const win = window;
const middlewares = [thunk];
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(rootReducer, {}, storeEnhancers);