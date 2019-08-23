import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'app/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const win = window;
const middlewares = [thunk];

const storeEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares),
  //(win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(rootReducer, {}, storeEnhancers);