import s from './CategoryMoviesPage.module.css';
import {useParams} from 'react-router';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '@/entities/movie/api/movieApi.ts';
import {MovieList} from '@/widgets/MovieList/MovieList.tsx';
import {createMovieCategoryData} from '@/shared/utils';
import {useEffect, useState} from 'react';
import {ButtonLink} from '@/shared/ui/ButtonLink/ButtonLink.tsx';


export const CategoryMoviesPage = () => {
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1)


    const {data: popular} = useGetPopularMoviesQuery({page: currentPage}, {
        skip: category !== 'popular',
    })
    const {data: upcoming} = useGetUpcomingMoviesQuery({page: currentPage}, {
        skip: category !== 'upcoming',
    })
    const {data: topRated} = useGetTopRatedMoviesQuery({page: currentPage}, {
        skip: category !== 'top-rated',
    })
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery({page: currentPage}, {
        skip: category !== 'now-playing',
    })

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);


    const categorySections = createMovieCategoryData({popular, nowPlaying, topRated, upcoming})

    const currentCategory = categorySections.find((c) => c.path === category)

    return (
        <section>
            <nav className={s.categoryButtons}>
                <ButtonLink path="/movies/popular">Popular</ButtonLink>
                <ButtonLink path="/movies/upcoming">Upcoming</ButtonLink>
                <ButtonLink path="/movies/top-rated">Top Rated</ButtonLink>
                <ButtonLink path="/movies/now-playing">Now Playing</ButtonLink>
            </nav>
            <MovieList category={currentCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>

    )
}