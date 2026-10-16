export const poster_sizes = {
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    original: "original"
} as const;

export type PosterSize = typeof poster_sizes[keyof typeof poster_sizes];

export const localstorage_key = {
    favorites: 'favoriteMovies',
    theme: 'themeMode',
} as const;

export const default_posters = {
    movie_poster: 'https://placehold.co/185x275?text=No+poster'
} as const;