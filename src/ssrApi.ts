import { reactHooksModule, coreModule, buildCreateApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import fetch from 'isomorphic-fetch';

const baseQuery = fetchBaseQuery({ baseUrl: '/api/', fetchFn: fetch });

const createApi = buildCreateApi(coreModule(), reactHooksModule({ unstable__sideEffectsInRender: true }));

export const api = createApi({
    baseQuery,
    endpoints: (builder) => ({
        getStuff: builder.query<string, string>({
            queryFn: (param) => Promise.resolve({
                error: {
                    status: 500,
                    data: {
                        message: 'error',
                    },
                }
            })
        }),
    }),
});

export const {
    useGetStuffQuery,
} = api;
