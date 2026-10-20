import { baseApi } from "@/app/api/baseApi.ts"
import type {MovieParams, ResponseMovie} from '@/entities/movie/api/movieApi.types.ts';

export const movieApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query<ResponseMovie, MovieParams>({
            query: (params) => ({url: '/movie/popular', params}),
            providesTags: ["PopularMovie"],
        }),
        getTopRatedMovies: build.query<ResponseMovie, MovieParams>({
            query: (params) => ({url: '/movie/top_rated', params}),
            providesTags: ["TopRatedMovie"],
        }),
        getUpcomingMovies: build.query<ResponseMovie, MovieParams>({
            query: (params) => ({url: '/movie/upcoming', params}),
            providesTags: ["UpcomingMovie"],
        }),
        getNowPlayingMovies: build.query<ResponseMovie, MovieParams>({
            query: (params) => ({url: '/movie/now_playing', params}),
            providesTags: ["NowPlayingMovie"],
        }),
        searchMoviesByTitle: build.query<ResponseMovie, MovieParams>({
            query: (params) => ({url: '/search/movie', params}),
        })
    }),
})

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
    useSearchMoviesByTitleQuery
} = movieApi
