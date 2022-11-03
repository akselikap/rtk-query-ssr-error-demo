import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './client/app';

export function renderReactAppToString(store: Store) {
    return ReactDomServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
