import s from '../MainPage.module.css'
import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';
import type {MovieData} from '@/entities/movie/api/movieApi.types.ts';
import type {MovieBlockData} from '@/shared/utils/createMovieCategoryData.ts';
import {poster_sizes} from '@/shared/constants';
import {ButtonLink} from '@/shared/ui/ButtonLink/ButtonLink.tsx';


type Props = {
    baseUrl: string | undefined
    blockData: MovieBlockData
}

export const MoviesBlock = ({baseUrl, blockData}: Props) => {

    return <section>
        <div className={s.blockTitle}>
            <h2>{blockData.title}</h2>
            <ButtonLink path={`/movies/${blockData.path}`}>View More</ButtonLink>
        </div>
        <div className={s.movieList}>
            {blockData && blockData.items.map((movie: MovieData, idx: number) => {
                return idx < 6 && <MovieItem key={movie.id} movie={movie} baseUrl={baseUrl} posterSize={poster_sizes.w185} itemWidth={'185px'} />
            })}
        </div>
    </section>
}