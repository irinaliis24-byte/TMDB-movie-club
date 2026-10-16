import { baseApi } from "@/app/api/baseApi.ts"
import type {ResponseMovie} from '@/entities/movie/api/movieApi.types.ts';

export const movieApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query<ResponseMovie, void>({
            query: () => "/movie/popular",
            providesTags: ["PopularMovie"],
        }),
        getTopRatedMovies: build.query<ResponseMovie, void>({
            query: () => "/movie/top_rated",
            providesTags: ["TopRatedMovie"],
        }),
        getUpcomingMovies: build.query<ResponseMovie, void>({
            query: () => "/movie/upcoming",
            providesTags: ["UpcomingMovie"],
        }),
        getNowPlayingMovies: build.query<ResponseMovie, void>({
            query: () => "/movie/now_playing",
            providesTags: ["NowPlayingMovie"],
        }),
    }),
})

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery
} = movieApi
