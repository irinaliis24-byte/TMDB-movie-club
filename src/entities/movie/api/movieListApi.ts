import {baseApi} from '@/app/api/baseApi.ts'
import type {FilterMovieParams, MovieParams} from '@/entities/movie/api/movieListApi.types.ts';
import {withZodCatch} from '@/shared/utils';
import {responseMovieSchema} from '@/entities/movie/model/schemas';

export const movieListApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query({
            query: (params: MovieParams) => ({url: '/movie/popular', params}),
            ...withZodCatch(responseMovieSchema),
            providesTags: ["PopularMovie"],
        }),
        getTopRatedMovies: build.query({
            query: (params: MovieParams) => ({url: '/movie/top_rated', params}),
            ...withZodCatch(responseMovieSchema),
            providesTags: ["TopRatedMovie"],
        }),
        getUpcomingMovies: build.query({
            query: (params: MovieParams) => ({url: '/movie/upcoming', params}),
            ...withZodCatch(responseMovieSchema),
            providesTags: ["UpcomingMovie"],
        }),
        getNowPlayingMovies: build.query({
            query: (params: MovieParams) => ({url: '/movie/now_playing', params}),
            ...withZodCatch(responseMovieSchema),
            providesTags: ["NowPlayingMovie"],
        }),
        searchMoviesByTitle: build.query({
            query: (params: MovieParams) => ({url: '/search/movie', params}),
            ...withZodCatch(responseMovieSchema),
        }),
        getFilteredMovies: build.query({
            query: (params: FilterMovieParams) => ({url: '/discover/movie', params}),
            ...withZodCatch(responseMovieSchema),
        })
    }),
})

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
    useSearchMoviesByTitleQuery,
    useGetFilteredMoviesQuery,
} = movieListApi
