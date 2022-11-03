import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export let api = createApi({
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

export function overrideExports(newApi: typeof api) {
    useGetStuffQuery = newApi.useGetStuffQuery;
    api = newApi;
}

export let {
    useGetStuffQuery,
} = api;
