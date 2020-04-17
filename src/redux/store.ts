import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer/index';
import axios from 'axios';

import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
});

export const store = createStore(
  rootReducer,
  applyMiddleware(axiosMiddleware(client, {
    returnRejectedPromiseOnError: true
  }))
);
