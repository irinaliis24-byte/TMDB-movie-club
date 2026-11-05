import {baseApi} from '@/app/api/baseApi.ts';
import type {Genres} from '@/entities/genres/api/genresApi.types.ts';

export const genresApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getGenres: build.query<Genres, void>({
            query: () => ({url: '/genre/movie/list'}),
        }),
    }),
})

export const {useGetGenresQuery} = genresApi