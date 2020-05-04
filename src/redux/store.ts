import { createStore, applyMiddleware } from 'redux';
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

export const store = createStore(
  rootReducer,
  applyMiddleware(
    axiosMiddleware(client, {
      returnRejectedPromiseOnError: true,
    })
  )
);
