import {baseApi} from '@/app/api/baseApi.ts'
import {withZodCatch} from '@/shared/utils';
import {responseCreditsSchema, responseMovieByIdSchema, responseMovieSchema} from '@/entities/movie/model/schemas';

export const movieItemApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMovieById: build.query({
            query: ({id}: {id: string}) => ({url: `/movie/${id}`}),
            ...withZodCatch(responseMovieByIdSchema),
        }),
        getCreditsById: build.query({
            query: ({id}: {id: string}) => ({url: `/movie/${id}/credits`}),
            ...withZodCatch(responseCreditsSchema),
        }),
        getSimilarMovies: build.query({
            query: ({id}: {id: string}) => ({url: `/movie/${id}/similar`}),
            ...withZodCatch(responseMovieSchema),
        }),
    }),
})

export const {
    useGetMovieByIdQuery,
    useGetCreditsByIdQuery,
    useGetSimilarMoviesQuery
} = movieItemApi
