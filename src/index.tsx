import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from 'react-modal';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import './index.css';
import { store } from './redux/store';

// Check api base url
if (!process.env.REACT_APP_API_URL) {
  throw new Error('Must set the REACT_APP_API_URL environment variables');
} else {
  console.log(`Api base url is ${process.env.REACT_APP_API_URL}`);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

Modal.setAppElement('#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
