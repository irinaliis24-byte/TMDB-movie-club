import type {MovieData, ResponseMovie} from '@/entities/movie/api/movieListApi.types.ts';
import {Path} from '@/app/routing/Path.ts';

export type MovieBlockData = {
    title: string;
    items: MovieData[];
    total_pages: number;
    path: string;
};

type CreateMovieBlockDataArgs = {
    popular?: ResponseMovie;
    upcoming?: ResponseMovie;
    topRated?: ResponseMovie;
    nowPlaying?: ResponseMovie;
};

export const createMovieCategoryData = ({
                                         popular,
                                         upcoming,
                                         topRated,
                                         nowPlaying,
                                     }: CreateMovieBlockDataArgs): MovieBlockData[] => {
    return [
        {
            title: 'Popular',
            items: popular?.results ?? [],
            total_pages: popular?.total_pages || 1,
            path: Path.Popular,
        },
        {
            title: 'Upcoming',
            items: upcoming?.results ?? [],
            total_pages: upcoming?.total_pages || 1,
            path: Path.Upcoming,
        },
        {
            title: 'Top Rated',
            items: topRated?.results ?? [],
            total_pages: topRated?.total_pages || 1,
            path: Path.TopRated,
        },
        {
            title: 'Now Playing',
            items: nowPlaying?.results ?? [],
            total_pages: nowPlaying?.total_pages || 1,
            path: Path.NowPlaying,
        },
    ];
};