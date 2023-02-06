import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from '../reducers/root';
import thunk from '../thunk/thunk';

const middlewares = [thunk];

if(process.env.NODE_ENV !== 'production'){
    middlewares.push(logger);
}

export default (preloadedState = {}) => createStore(
  rootReducer, preloadedState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
