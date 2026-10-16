import type {MovieData} from '@/entities/movie/api/movieApi.types.ts';
import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import type {MovieBlockData} from '@/shared/utils/createMovieCategoryData.ts';
import s from './MovieList.module.css'
import {poster_sizes} from '@/shared/constants';

type Props = {
    category: MovieBlockData | undefined
}

export const MovieList = ({category}: Props) => {
    const {data: details} = useGetDetailsQuery()
    const baseUrl = details && details.images.base_url

    return (
        <>
            <h2>{category?.title}</h2>
            <div>
                {category
                    ? <div className={s.list}>
                        {category.items && category.items.map((movie: MovieData) => {
                            return <MovieItem key={movie.id} movie={movie} posterSize={poster_sizes.w185} itemWidth={'240px'} baseUrl={baseUrl}/>
                        })}
                    </div>
                    : <h2>This category is empty</h2>
                }
            </div>
        </>
    );
};