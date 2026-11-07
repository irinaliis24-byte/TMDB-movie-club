import { BlockTitle } from '@/shared/ui/BlockTitle';
import s from './FilteredMoviesPage.module.css';
import { Filters } from '@/features/filterMovie';
import { MovieList } from '@/widgets/Movie/MovieList/MovieList.tsx';
import { useGetFilteredMoviesQuery } from '@/entities/movie/api/movieListApi.ts';
import { useSearchParams } from 'react-router';
import {useDebounceValue} from '@/shared/hooks/useDebounceValue.ts';
import {useState} from 'react';

const DEFAULT_SORT = 'popularity.desc';
const RATING_MIN = 0;
const RATING_MAX = 10;

type FilterState = {
    genres: string[];
    ratingFrom: number;
    ratingTo: number;
    sortBy: string;
};

const parseGenres = (value: string | null): string[] =>
    value
        ? value.split(',').map((v) => v.trim()).filter(Boolean)
        : [];

const parseRating = (value: string | null, fallback: number): number => {
    const parsed = Number(value);
    return parsed !== 0 ? parsed : fallback;
};

const getFilterStateFromParams = (params: URLSearchParams): FilterState => ({
    genres: parseGenres(params.get('genre')),
    ratingFrom: parseRating(params.get('rating_min'), RATING_MIN),
    ratingTo: parseRating(params.get('rating_max'), RATING_MAX),
    sortBy: params.get('sort') ?? DEFAULT_SORT,
});

const getParamsFromFilterState = (filters: FilterState): URLSearchParams => {
    const next = new URLSearchParams();

    if (filters.genres.length) {
        next.set('genre', filters.genres.join(','));
    }

    const min = Math.min(filters.ratingFrom, filters.ratingTo);
    const max = Math.max(filters.ratingFrom, filters.ratingTo);

    if (min !== RATING_MIN || max !== RATING_MAX) {
        next.set('rating_min', String(min));
        next.set('rating_max', String(max));
    }

    next.set('sort', filters.sortBy);
    return next;
};

const DEFAULT_FILTERS: FilterState = {
    genres: [],
    ratingFrom: RATING_MIN,
    ratingTo: RATING_MAX,
    sortBy: DEFAULT_SORT,
};

export const FilteredMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const filters = getFilterStateFromParams(searchParams);

    const appliedRatingFrom = Math.min(filters.ratingFrom, filters.ratingTo);
    const appliedRatingTo = Math.max(filters.ratingFrom, filters.ratingTo);

    const { data } = useGetFilteredMoviesQuery({
        with_genres: filters.genres.length ? filters.genres.join(',') : undefined,
        'vote_average.gte': useDebounceValue(appliedRatingFrom),
        'vote_average.lte': useDebounceValue(appliedRatingTo),
        sort_by: filters.sortBy,
        page: currentPage,
    });

    const applyFilters = (next: FilterState) => {
        setCurrentPage(1);
        setSearchParams(getParamsFromFilterState(next));
    };

    const handleReset = () => {
        setCurrentPage(1);
        setSearchParams(getParamsFromFilterState(DEFAULT_FILTERS));
    };

    return (
        <div className={s.filteredMoviesPage}>
            <BlockTitle>Filtered Movies</BlockTitle>

            <div className={s.wrapper}>
                <div className={s.filtersArea}>
                    <Filters
                        genres={filters.genres}
                        ratingFrom={filters.ratingFrom}
                        ratingTo={filters.ratingTo}
                        sortBy={filters.sortBy}
                        setGenres={(genres) =>
                            applyFilters({ ...filters, genres })
                        }
                        setRatingFrom={(ratingFrom) =>
                            applyFilters({
                                ...filters,
                                ratingFrom: Math.min(ratingFrom, filters.ratingTo),
                            })
                        }
                        setRatingTo={(ratingTo) =>
                            applyFilters({
                                ...filters,
                                ratingTo: Math.max(ratingTo, filters.ratingFrom),
                            })
                        }
                        setSortBy={(sortBy) =>
                            applyFilters({ ...filters, sortBy })
                        }
                        onReset={handleReset}
                    />
                </div>

                <div className={s.moviesArea}>
                    <MovieList
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesCount={data?.total_pages || 1}
                        movies={data?.results}
                    />
                </div>
            </div>
        </div>
    );
};