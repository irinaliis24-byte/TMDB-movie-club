import s from './MoviesBlock.module.css'
import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';
import type {MovieData} from '@/entities/movie/api/movieListApi.types.ts';
import type {MovieBlockData} from '@/shared/utils/createMovieCategoryData.ts';
import {poster_sizes} from '@/shared/constants';
import {ButtonLink} from '@/shared/ui/ButtonLink';
import {BlockTitle} from '@/shared/ui/BlockTitle';


type Props = {
    baseUrl: string | undefined
    blockData: MovieBlockData
}

export const MoviesBlock = ({baseUrl, blockData}: Props) => {

    return <section className={s.wrapper}>
        <div className={s.blockHeader}>
            <BlockTitle>{blockData.title}</BlockTitle>
            <ButtonLink path={`/movies/${blockData.path}`}>
                View More
            </ButtonLink>
        </div>
        <div className={s.movieBlock}>
            {blockData && blockData.items.map((movie: MovieData, idx: number) => {
                return idx < 6 && <MovieItem key={movie.id} movie={movie} baseUrl={baseUrl} posterSize={poster_sizes.w185} itemWidth={'185px'} />
            })}
        </div>
    </section>
}