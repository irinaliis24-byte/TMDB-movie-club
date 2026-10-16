import s from '../MainPage.module.css'
import {MovieItem} from '@/widgets/MovieItem/MovieItem.tsx';
import type {MovieData} from '@/entities/movie/api/movieApi.types.ts';
import type {MovieBlockData} from '@/shared/utils/createMovieCategoryData.ts';
import {NavLink} from 'react-router';
import {poster_sizes} from '@/shared/constants';


type Props = {
    baseUrl: string | undefined
    blockData: MovieBlockData
}

export const MoviesBlock = ({baseUrl, blockData}: Props) => {

    return <section>
        <h2>{blockData.title}</h2>
        <NavLink to={`/movies/${blockData.path}`}>View More</NavLink>
        <div className={s.movieList}>
            {blockData && blockData.items.map((movie: MovieData, idx: number) => {
                return idx < 6 && <MovieItem key={movie.id} movie={movie} baseUrl={baseUrl} posterSize={poster_sizes.w185} itemWidth={'185px'} />
            })}
        </div>
    </section>
}