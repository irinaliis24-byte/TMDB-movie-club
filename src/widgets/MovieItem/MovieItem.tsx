import s from './MovieItem.module.css'
import {default_posters, type PosterSize} from '@/shared/constants';
import {type FavoriteMovie} from '@/shared/utils/getFavorites.ts';
import {useAppDispatch, useAppSelector} from '@/app/model/hooks';
import {selectIsFavorite, toggleFavorite} from '@/pages/FavoritesPage/model/favoritesSlice.ts';

type MovieItemProps = {
    movie: FavoriteMovie
    baseUrl: string | undefined
    posterSize: PosterSize
    itemWidth: string
}

export const MovieItem = ({movie, baseUrl, posterSize, itemWidth}: MovieItemProps) => {

    const dispatch = useAppDispatch()
    const isFav = useAppSelector(selectIsFavorite(movie.id))

    // const toFavoriteHandler = () => {
    //     const favorites = getFavorites()
    //
    //     const existingFavorite = favorites.find((f) => f.id === movie.id)
    //
    //     let updatedFavorites
    //     if (existingFavorite) {
    //         updatedFavorites = favorites.filter((f) => f.id !== existingFavorite.id)
    //     } else {
    //         updatedFavorites = [
    //             ...favorites,
    //             {id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average}
    //         ]
    //     }
    //
    //     try {
    //         localStorage.setItem(localstorage_key.favorites, JSON.stringify(updatedFavorites))
    //     } catch (err) {
    //         console.error('Failed to save favorites', err)
    //     }
    // }

    const posterSrc =
        baseUrl && movie.poster_path
            ? `${baseUrl}${posterSize}${movie.poster_path}`
            : default_posters.movie_poster

    const imageAlt = movie.title ? `${movie.title} poster` : 'movie poster'

    const onToggle = () => {
        // dispatch toggleFavorite with minimal shape (FavoriteMovie)
        dispatch(toggleFavorite({id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average}))
    }

    return <div className={s.item} style={{width: itemWidth}}>
        <a href={'#'} className={s.cover}>
            <img src={posterSrc} alt={imageAlt} />
            {movie.vote_average > 0 && <span>{movie.vote_average}</span>}
        </a>
        <button className={isFav ? s.liked : s.defaultLike} onClick={onToggle}>like</button>
        <a href="#" className={s.titleLink}><h3>{movie.title}</h3></a>
    </div>
}