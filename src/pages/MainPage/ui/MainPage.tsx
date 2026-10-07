import {SearchMovieForm} from '@/features/searchMovie';
// import s from './MainPage.module.css'
import {getRandomNumber} from '@/shared/utils/getRandomNumber.ts';
import {useGetPopularMoviesQuery} from '@/entities/movie/api/movieApi.ts';
import {useEffect, useState} from 'react';
import type {MovieItem} from '@/entities/movie/api/movieApi.types.ts';

export const MainPage = () => {
    const {data} = useGetPopularMoviesQuery()
    const [coverMovie, setCoverMovie] = useState<MovieItem | null>(null)

    useEffect(() => {
        if (!data) return;
        const currentMovie = data.results[getRandomNumber(data.results.length)]
        setCoverMovie(currentMovie)
    }, [data])


    return <section>
        <section>
            <h3>Welcome to</h3>
            <h1>Movie-club</h1>
            <div>Discover thousands of movies</div>
            <SearchMovieForm/>
            <p>{coverMovie && coverMovie.title}</p>
        </section>
    </section>
}