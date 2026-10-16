import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';
import {poster_sizes} from '@/shared/constants';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import {useAppSelector} from '@/app/model/hooks';
import {selectFavorites} from '@/pages/FavoritesPage/model/favoritesSlice.ts';

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites)
    const {data: details} = useGetDetailsQuery()
    const baseUrl = details && details.images.base_url

    return (
        <div>
            <h2>FavoritesPage</h2>
            <div style={{display: 'flex', gap: '16px'}}>{favorites.map((movie) => (
                <MovieItem key={movie.id} movie={movie} posterSize={poster_sizes.w185} itemWidth={'185px'} baseUrl={baseUrl}/>
            ))}</div>
        </div>
    )
}