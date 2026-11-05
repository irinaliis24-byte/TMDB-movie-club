import {localstorage_key} from '@/shared/constants';

export type FavoriteMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number
}

export const getFavorites = (): FavoriteMovie[] => {
    const savedMovies = localStorage.getItem(localstorage_key.favorites)

    return savedMovies ? JSON.parse(savedMovies) : []
}