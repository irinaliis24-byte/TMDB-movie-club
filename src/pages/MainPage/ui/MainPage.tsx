import {SearchMovieForm} from '@/features/searchMovie';
import s from './MainPage.module.css'
import {getRandomNumber} from '@/shared/utils/getRandomNumber.ts';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '@/entities/movie/api/movieApi.ts';
import {useEffect, useState} from 'react';
import type {MovieData} from '@/entities/movie/api/movieApi.types.ts';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import {MoviesBlock} from '@/pages/MainPage/ui/MoviesBlock/MoviesBlock.tsx';
import {createMovieCategoryData} from '@/shared/utils/createMovieCategoryData.ts';


export const MainPage = () => {
    const {data: popular} = useGetPopularMoviesQuery()
    const {data: upcoming} = useGetUpcomingMoviesQuery()
    const {data: topRated} = useGetTopRatedMoviesQuery()
    const {data: nowPlaying} = useGetNowPlayingMoviesQuery()

    const {data: details} = useGetDetailsQuery()
    const [coverMovie, setCoverMovie] = useState<MovieData | null>(null)

    useEffect(() => {
        if (!popular) return;
        const currentMovie = popular.results[getRandomNumber(popular.results.length)]
        setCoverMovie(currentMovie)
    }, [popular])


    const movieBlockData = createMovieCategoryData({popular, upcoming, topRated, nowPlaying})


    const baseUrl = details && details.images.base_url
    const bgUrl = coverMovie &&  coverMovie.backdrop_path

    const inlineStyle = bgUrl ? { backgroundImage: `url('${baseUrl}original${bgUrl}')` } : {};

    return <section>
        <section className={s.backgroundContainer} style={inlineStyle}>
            <div className={s.welcomeBlock}>
                <h3 className={s.welcomeSubtitle}>Welcome to the</h3>
                <h1 className={s.welcomeTitle}>Movie-club</h1>
                <div className={s.searchLabel}>Discover thousands of movies</div>
                <SearchMovieForm/>
            </div>
            <div className={s.backgroundMovie}>{coverMovie && coverMovie.title}</div>
        </section>
        { movieBlockData.map((item) => <MoviesBlock key={item.title} blockData={item} baseUrl={baseUrl}/>)}
    </section>
}