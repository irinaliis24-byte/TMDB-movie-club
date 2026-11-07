import s from './CategoryMoviesPage.module.css';
import {useParams} from 'react-router';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '@/entities/movie/api/movieListApi.ts';
import {MovieList} from '@/widgets/Movie/MovieList/MovieList.tsx';
import {createMovieCategoryData} from '@/shared/utils';
import {useEffect, useState} from 'react';
import {ButtonLink} from '@/shared/ui/ButtonLink';
import {BlockTitle} from '@/shared/ui/BlockTitle';
import {Path} from '@/app/routing/Path.ts';
import Skeleton from 'react-loading-skeleton';
import {NotFoundPage} from '@/pages/NotFoundPage';


export const CategoryMoviesPage = () => {
    const { category } = useParams();

    const validCategories = [
        'popular',
        'upcoming',
        'top-rated',
        'now-playing',
    ];

    if (!validCategories.includes(category ?? '')) {
        return <NotFoundPage />;
    }

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

    const currentCategory = categorySections.find((c) => c.path.includes(category  || ''))
    if (!currentCategory) return null;

    return (
        <section>
            <nav className={s.categoryButtons}>
                <ButtonLink path={Path.Popular}>Popular</ButtonLink>
                <ButtonLink path={Path.Upcoming}>Upcoming</ButtonLink>
                <ButtonLink path={Path.TopRated}>Top Rated</ButtonLink>
                <ButtonLink path={Path.NowPlaying}>Now Playing</ButtonLink>
            </nav>
            <div className={s.wrapper}>
                <BlockTitle>{currentCategory.title || <Skeleton />}</BlockTitle>
                <MovieList category={currentCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </section>

    )
}