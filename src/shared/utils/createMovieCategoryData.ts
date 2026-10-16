import type {MovieData, ResponseMovie} from '@/entities/movie/api/movieApi.types.ts';

export type MovieBlockData = {
    title: string;
    items: MovieData[];
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
            path: 'popular',
        },
        {
            title: 'Upcoming',
            items: upcoming?.results ?? [],
            path: 'upcoming',
        },
        {
            title: 'Top Rated',
            items: topRated?.results ?? [],
            path: 'top-rated',
        },
        {
            title: 'Now Playing',
            items: nowPlaying?.results ?? [],
            path: 'now-playing',
        },
    ];
};