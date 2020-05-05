import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducer/index';
import axios from 'axios';

import axiosMiddleware from 'redux-axios-middleware';
import { appHistory } from '../common/history';

const client = axios.create({
  baseURL: '/api',
  responseType: 'json',
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      appHistory.push('/oauth');
    }
    throw error;
  }
);

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      axiosMiddleware(client, {
        returnRejectedPromiseOnError: true,
      })
    )
  )
);
