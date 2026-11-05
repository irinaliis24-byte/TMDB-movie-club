import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {handleError} from '@/shared/utils';

export const baseApi = createApi({
    reducerPath: 'moviesApi',
    tagTypes: ['PopularMovie', 'TopRatedMovie', 'UpcomingMovie', 'NowPlayingMovie', 'Configuration'],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
                headers.set('accept', 'application/json')
                return headers
            }
        })(args, api, extraOptions)

        if (result.error) {
            handleError(result.error)
            console.log(result.error)
        }
        return result
    },
    endpoints: () => ({}),
})
