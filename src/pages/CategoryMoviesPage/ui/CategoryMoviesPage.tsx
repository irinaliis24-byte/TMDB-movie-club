import s from './CategoryMoviesPage.module.css';
import {NavLink, useParams} from 'react-router';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '@/entities/movie/api/movieApi.ts';
import {MovieList} from '@/widgets/MovieList/MovieList.tsx';
import {createMovieCategoryData} from '@/shared/utils/createMovieCategoryData.ts';


export const CategoryMoviesPage = () => {
    const { category } = useParams();

    const {data: popular} = useGetPopularMoviesQuery(undefined, {
        skip: category !== 'popular',
    })
    const {data: upcoming} = useGetUpcomingMoviesQuery(undefined, {
        skip: category !== 'upcoming',
    })
    const {data: topRated} = useGetTopRatedMoviesQuery(undefined, {
        skip: category !== 'top-rated',
    })
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery(undefined, {
        skip: category !== 'now-playing',
    })



    const categorySections = createMovieCategoryData({popular, nowPlaying, topRated, upcoming})

    const currentCategory = categorySections.find((c) => c.path === category)

    return (
        <section>
            <nav className={s.categoryButtons}>
                <NavLink to="/movies/popular">Popular</NavLink>
                <NavLink to="/movies/upcoming">Upcoming</NavLink>
                <NavLink to="/movies/top-rated">Top Rated</NavLink>
                <NavLink to="/movies/now-playing">Now Playing</NavLink>
            </nav>
            <MovieList category={currentCategory}/>
        </section>

    )
}