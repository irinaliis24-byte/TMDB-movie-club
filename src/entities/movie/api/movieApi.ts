import { baseApi } from "@/app/api/baseApi.ts"
import type {ResponseMovie} from '@/entities/movie/api/movieApi.types.ts';

export const movieApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query<ResponseMovie, void>({
            query: () => "/movie/popular",
            providesTags: ["Movie"],
        }),
    }),
})

export const {useGetPopularMoviesQuery} = movieApi
