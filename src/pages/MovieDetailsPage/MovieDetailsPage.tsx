import {default_posters, poster_sizes} from '@/shared/constants';
import {useNavigate, useParams} from 'react-router';
import {
    useGetCreditsByIdQuery,
    useGetMovieByIdQuery,
    useGetSimilarMoviesQuery
} from '@/entities/movie/api/movieItemApi.ts';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import s from './MovieDetailsPage.module.css'
import {MoviesBlock} from '@/widgets/Movie/MoviesBlock/MoviesBlock.tsx';
import {PersonsBlock} from '@/widgets/Person/PersonsBlock/PersonsBlock.tsx';
import {RatingLabel} from '@/shared/ui/RatingLabel/RatingLabel.tsx';

export const MovieDetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

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

    const runtime = () => {
        const hours = Math.floor(movie.runtime / 60);
        const minutes = movie.runtime % 60;
        return `${hours} h ${minutes} min`;
    }


    return <section className={s.main}>
        <section className={s.movieDetails}>
            <img className={s.moviePoster} src={posterSrc} alt={imageAlt}/>
            <div className={s.movieInfo}>
                <h2 className={s.movieTitle}>{movie.title}</h2>
                <p>{movie.tagline}</p>
                <div className={s.shortInfo}>
                    <span>{movie.release_date.slice(0, 4)}</span>
                    <RatingLabel voteAverage={movie.vote_average}/>
                    <span>{runtime()}</span>
                </div>
                <div>{movie.overview}</div>
                <div className={s.genres}>{movie.genres.map((m) => <p key={m.id}
                                                                      className={s.genreName}>{m.name}</p>)}</div>
            </div>
            <button className={s.backButton} onClick={() => navigate(-1)}>Back</button>
        </section>
        {credits && credits.cast.length > 0 &&
            <PersonsBlock title={'Actors'} items={credits?.cast} baseUrl={baseUrl}/>}
        {similar && similar.results.length > 0 &&
            <MoviesBlock items={similar?.results || []} baseUrl={baseUrl} title={'Similar movies'}/>}
    </section>
}