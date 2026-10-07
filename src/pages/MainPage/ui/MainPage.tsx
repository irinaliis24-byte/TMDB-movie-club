import {SearchMovieForm} from '@/features/searchMovie';
import s from './MainPage.module.css'
import {getRandomNumber} from '@/shared/utils/getRandomNumber.ts';
import {useGetPopularMoviesQuery} from '@/entities/movie/api/movieApi.ts';
import {useEffect, useState} from 'react';
import type {MovieItem} from '@/entities/movie/api/movieApi.types.ts';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';

export const MainPage = () => {
    const {data} = useGetPopularMoviesQuery()
    const {data: details} = useGetDetailsQuery()
    const [coverMovie, setCoverMovie] = useState<MovieItem | null>(null)

    useEffect(() => {
        if (!data) return;
        const currentMovie = data.results[getRandomNumber(data.results.length)]
        setCoverMovie(currentMovie)
    }, [data])

    const baseUrl = details && details.images.base_url
    const bgUrl = coverMovie &&  coverMovie.backdrop_path

    const inlineStyle = bgUrl ? { backgroundImage: `url('${baseUrl}original${bgUrl}')` } : {};

    return <section>
        <section className={s.backgroundContainer} style={inlineStyle}>
            <div className={s.welcomeBlock}>
                <h3>Welcome to</h3>
                <h1>Movie-club</h1>
                <div>Discover thousands of movies</div>
                <SearchMovieForm/>
            </div>
            <div className={s.backgroundMovie}>{coverMovie && coverMovie.title}</div>
        </section>
    </section>
}