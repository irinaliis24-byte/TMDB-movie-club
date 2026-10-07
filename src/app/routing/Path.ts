export const Path = {
    MainPage: '/',
    CategoryMovies: '/category_movies',
    FilteredMovies: '/filtered_movies',
    Search: '/search',
    Favorites: '/favorites',
    NotFound: '*',
} as const

// Main — главная/домашняя страница
// Category Movies — страница с выбором различных категорий
// Filtered Movies — страница, на которой можно фильтровать и сортировать фильмы по различным условиям
// Search — страница поиска фильма по названию
// Favorites — избранные/любимые фильмы