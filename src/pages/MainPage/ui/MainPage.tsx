import {SearchMovieForm} from '@/features/searchMovie';
import s from './MainPage.module.css'
import {getRandomNumber} from '@/shared/utils';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '@/entities/movie/api/movieListApi.ts';
import {useEffect, useState} from 'react';
import type {MovieData} from '@/entities/movie/api/movieListApi.types.ts';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import {MoviesBlock} from '@/widgets/Movie/MoviesBlock/MoviesBlock.tsx';
import {createMovieCategoryData} from '@/shared/utils/createMovieCategoryData.ts';
import {ButtonLink} from '@/shared/ui/ButtonLink';


export const MainPage = () => {
    const {data: popular} = useGetPopularMoviesQuery({page: 1})
    const {data: upcoming} = useGetUpcomingMoviesQuery({page: 1})
    const {data: topRated} = useGetTopRatedMoviesQuery({page: 1})
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery({page: 1})

    const {data: details} = useGetDetailsQuery()
    const [coverMovie, setCoverMovie] = useState<MovieData | null>(null)

    useEffect(() => {
        if (!popular) return;
        const currentMovie = popular.results[getRandomNumber(popular.results.length)]
        setCoverMovie(currentMovie)
    }, [popular])


    const movieBlockData = createMovieCategoryData({popular, upcoming, topRated, nowPlaying})
    const baseUrl = details && details.images.base_url

    if (!coverMovie) return null;
    const bgUrl = coverMovie.backdrop_path

    const inlineStyle = bgUrl ? {backgroundImage: `url('${baseUrl}original${bgUrl}')`} : {};

    return <section>
        <section className={s.backgroundContainer} style={inlineStyle}>
            <div className={s.welcomeBlock}>
                <h3 className={s.welcomeSubtitle}>Welcome to the</h3>
                <h1 className={s.welcomeTitle}>Movie-club</h1>
                <div className={s.searchLabel}>
                    Discover thousands of movies
                    <SearchMovieForm/>
                </div>
            </div>
            <div className={s.backgroundMovieTitle}>
                {coverMovie.title}
                <ButtonLink path={`/movie/${coverMovie.id}`}>About</ButtonLink>
            </div>
        </section>
        {movieBlockData.map((item) => <MoviesBlock key={item.title} path={item.path} title={item.title} items={item.items} baseUrl={baseUrl}/>)}
    </section>
}