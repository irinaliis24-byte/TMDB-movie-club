import {baseApi} from '@/app/api/baseApi.ts';
import type {ConfigResponse} from '@/shared/api/configApi.types.ts';

export const configApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDetails: build.query<ConfigResponse, void>({
            query: () => "/configuration",
            providesTags: ["Configuration"],
        }),
    }),
})

export const {useGetDetailsQuery} = configApi