import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { REACT_APP_MOUNT_ID } from '../constants';
import { api } from './api';

const store = createStore(api);
const root = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.hydrateRoot(
  document.getElementById(REACT_APP_MOUNT_ID),
  root,
);
