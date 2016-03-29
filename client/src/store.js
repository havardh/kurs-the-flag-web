import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(browserHistory, initialState) {
  const middlewares = [
    thunkMiddleware,
    loggerMiddleware,
    routerMiddleware(browserHistory),
  ];

  const storeEnhancers = [applyMiddleware(...middlewares)];
  const finalCreateStore = compose(...storeEnhancers)(createStore);
  return finalCreateStore(reducers, initialState);
}
