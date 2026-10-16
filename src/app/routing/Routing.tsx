import {Navigate, Route, Routes} from 'react-router';
import {Path} from '@/app/routing';
import {MainPage} from '@/pages/MainPage';
import {CategoryMoviesPage} from '@/pages/CategoryMoviesPage';
import {FilteredMoviesPage} from '@/pages/FilteredMoviesPage';
import {SearchPage} from '@/pages/SearchPage';
import {FavoritesPage} from '@/pages/FavoritesPage';
import {NotFoundPage} from '@/pages/NotFoundPage';

export const Routing = () => (
    <Routes>
        <Route path={Path.MainPage} element={<MainPage/>}/>
        <Route path={Path.CategoryMovies + '/:category'} element={<CategoryMoviesPage/>}/>
        <Route path={Path.CategoryMovies} element={<Navigate to="/movies/popular" replace/>}/>
        <Route path={Path.FilteredMovies} element={<FilteredMoviesPage/>}/>
        <Route path={Path.Search} element={<SearchPage/>}/>
        <Route path={Path.Favorites} element={<FavoritesPage/>}/>
        <Route path={Path.NotFound} element={<NotFoundPage/>}/>
    </Routes>
)