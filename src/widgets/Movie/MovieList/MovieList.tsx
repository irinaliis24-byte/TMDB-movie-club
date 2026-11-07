import type {MovieData} from '@/entities/movie/api/movieListApi.types.ts';
import {MovieItem} from '@/widgets/Movie/MovieItem/MovieItem.tsx';
import {useGetDetailsQuery} from '@/shared/api/configApi.ts';
import type {MovieBlockData} from '@/shared/utils/createMovieCategoryData.ts';
import s from './MovieList.module.css'
import {poster_sizes} from '@/shared/constants';
import {Pagination} from '@/shared/ui/Pagination';

type Props = {
    category?: MovieBlockData | undefined
    movies?: MovieData[]
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    pagesCount?: number
}

export const MovieList = ({
                              category,
                              movies,
                              currentPage,
                              setCurrentPage,
                              pagesCount,
                          }: Props) => {
    const { data: details } = useGetDetailsQuery()
    const baseUrl = details?.images?.base_url

    const items = category?.items ?? movies ?? []
    const totalPages = category?.total_pages ?? pagesCount ?? 1

    const renderMovie = (movie: MovieData) => (
        <MovieItem
            key={movie.id}
            movie={movie}
            posterSize={poster_sizes.w185}
            itemWidth="180px"
            baseUrl={baseUrl}
        />
    )

    if (!items.length && !category && !movies) {
        return null
    }

    return (
        <>
            <div className={s.list}>
                {items.map(renderMovie)}
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={totalPages}
            />
        </>
    )
}
