import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './reducer';
import axios from 'axios';

import axiosMiddleware from 'redux-axios-middleware';
import { redirectLogin } from '../util/auth';

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
      redirectLogin();
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
