import s from './MoviesBlock.module.css'
import {MovieItem} from '@/widgets/Movie/MovieItem/MovieItem.tsx';
import type {MovieData} from '@/entities/movie/api/movieListApi.types.ts';
import {poster_sizes} from '@/shared/constants';
import {ButtonLink} from '@/shared/ui/ButtonLink';
import {BlockTitle} from '@/shared/ui/BlockTitle';


type Props = {
    baseUrl: string | undefined
    title?: string
    path?: string
    items: MovieData[]
}

export const MoviesBlock = ({baseUrl, title, path, items}: Props) => {

    return <section className={s.wrapper}>
        <div className={s.blockHeader}>
            {title && <BlockTitle>{title}</BlockTitle>}
            {path && <ButtonLink path={path}> View More </ButtonLink>}
        </div>
        <div className={s.movieBlock}>
            {items.map((movie, idx: number) => {
                return idx < 6 &&
                    <MovieItem key={movie.id} movie={movie} baseUrl={baseUrl} posterSize={poster_sizes.w185}
                               itemWidth={'185px'}/>
            })}
        </div>
    </section>
}