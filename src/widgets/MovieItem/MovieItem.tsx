import s from './MovieItem.module.css'
import {default_posters, type PosterSize} from '@/shared/constants';
import {type FavoriteMovie} from '@/shared/utils';
import {useAppDispatch, useAppSelector} from '@/app/model/hooks';
import {selectIsFavorite, toggleFavorite} from '@/pages/FavoritesPage/model/favoritesSlice.ts';
import {Link} from 'react-router';
import {Icon} from '@/shared/ui/Icon/Icon.tsx';

type MovieItemProps = {
    movie: FavoriteMovie
    baseUrl: string | undefined
    posterSize: PosterSize
    itemWidth: string
}

export const MovieItem = ({movie, baseUrl, posterSize, itemWidth}: MovieItemProps) => {

    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector(selectIsFavorite(movie.id))

    const posterSrc =
        baseUrl && movie.poster_path
            ? `${baseUrl}${posterSize}${movie.poster_path}`
            : default_posters.movie_poster

    const imageAlt = movie.title ? `${movie.title} poster` : 'movie poster'

    const onToggle = () => {
        dispatch(toggleFavorite({id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average}))
    }

    return <div className={s.itemContainer} style={{width: itemWidth}}>
        <div className={s.cover}>
            <Link to={`/movie/${movie.id}`}>
                <img src={posterSrc} alt={imageAlt} className={s.poster}/>
                {movie.vote_average > 0 && <span className={s.rating}>{movie.vote_average.toFixed(1)}</span>}
            </Link>
            <button className={`${s.likeButton} ${isFavorite ? s.liked : s.default}`} onClick={onToggle}>
                <Icon iconId={'heart'} width={'25px'} height={'25px'} viewBox={'0 0 25 25'} fill={isFavorite ? 'red' : undefined} />
            </button>
        </div>
        <Link to={`/movie/${movie.id}`} className={s.titleLink}><h3>{movie.title}</h3></Link>
    </div>
}