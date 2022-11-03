import { configureStore } from '@reduxjs/toolkit';
import { api as clientApi } from './api';

export function createStore(api: typeof clientApi) {
    return configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware, logger),
    });
}

const logger = (store: any) => (next: any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState());
    return result
}
