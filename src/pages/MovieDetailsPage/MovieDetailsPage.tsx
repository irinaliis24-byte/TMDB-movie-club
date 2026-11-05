import {default_posters, poster_sizes} from '@/shared/constants';
import {useParams} from 'react-router';
import {
    useGetCreditsByIdQuery,
    useGetMovieByIdQuery,
    useGetSimilarMoviesQuery
} from '@/entities/movie/api/movieItemApi.ts';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import s from './MovieDetailsPage.module.css'
import type {MovieData} from '@/entities/movie/api/movieListApi.types.ts';
import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';

export const MovieDetailsPage = () => {
    const {id} = useParams();

    const {data: movie} = useGetMovieByIdQuery({id: id || ''});
    const {data: credits} = useGetCreditsByIdQuery({id: id || ''})
    const {data: similar} = useGetSimilarMoviesQuery({id: id || ''})

    const {data: details} = useGetDetailsQuery()
    const baseUrl = details && details.images.base_url

    if (!movie) return null;

    const posterSrc =
        baseUrl && movie.poster_path
            ? `${baseUrl}${poster_sizes.w342}${movie.poster_path}`
            : default_posters.movie_poster

    const imageAlt = movie.title ? `${movie.title} poster` : 'movie poster'

    return <section className={s.main}>
        <section className={s.movieDetails}>
            <img className={s.moviePoster} src={posterSrc} alt={imageAlt}/>
            <div className={s.movieInfo}>
                <h3>{movie.title}</h3>
                <p>{movie.tagline}</p>
                <p>Release year: {movie.release_date}</p>
                <p>Runtime: {movie.runtime}</p>
                <div>{movie.overview}</div>
                <div>{movie.genres.map((m) => <p key={m.id}>{m.name}</p>)}</div>
            </div>
        </section>
        <section>
            <h4>Actors:</h4>
            {credits && credits.cast.map((actor, idx) => {
                if (idx < 5) {
                    return <p key={actor.id}>{actor.name}</p>
                }
            })}
        </section>
        <section>
            <h4>Similar movies:</h4>
            {similar && similar?.results.map((movie: MovieData, idx: number) => {
                return idx < 6 &&
                    <MovieItem key={movie.id} movie={movie} baseUrl={baseUrl} posterSize={poster_sizes.w185}
                               itemWidth={'185px'}/>
            })}
        </section>
    </section>
}