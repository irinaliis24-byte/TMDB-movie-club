import {useGetGenresQuery} from '@/entities/genres/api/genresApi.ts';
import {RatingRange} from '@/features/filterMovie/ui/Filters/RatingRange/RatingRange.tsx';
import s from './Filters.module.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import {FilterBox} from '@/widgets/Skeleton/FilterBox.tsx';

const sortByOptions = [
    {value: 'popularity.desc', label: 'Popularity Descending'},
    {value: 'popularity.asc', label: 'Popularity Ascending'},
    {value: 'vote_average.desc', label: 'Rating Descending'},
    {value: 'vote_average.asc', label: 'Rating Ascending'},
    {value: 'primary_release_date.desc', label: 'Release Date Descending'},
    {value: 'primary_release_date.asc', label: 'Release Date Ascending'},
    {value: 'title.asc', label: 'Title (A-Z)'},
    {value: 'title.desc', label: 'Title (Z-A)'},
];

type Props = {
    sortBy: string;
    genres: string[];
    ratingFrom: number;
    ratingTo: number;
    setGenres: (genres: string[]) => void;
    setRatingFrom: (rating: number) => void;
    setRatingTo: (rating: number) => void;
    setSortBy: (sortBy: string) => void;
    onReset: () => void;
};


export const Filters = ({
                            sortBy,
                            genres,
                            ratingFrom,
                            ratingTo,
                            setGenres,
                            setRatingFrom,
                            setRatingTo,
                            setSortBy,
                            onReset,
                        }: Props) => {
    const {data, isLoading} = useGetGenresQuery();
    const genreList = data?.genres ?? [];

    const toggleGenre = (genreId: string) => {
        if (genres.includes(genreId)) {
            setGenres(genres.filter((item) => item !== genreId));
            return;
        }

        setGenres([...genres, genreId]);
    };

    return (
        <form className={s.filters}>
            <label>
                <h4 className={s.labelSort}>Sort by:</h4>
                <select
                    className={s.sorting}
                    name="sort_by"
                    id="sort_by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    {sortByOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            {isLoading ? <Skeleton count={10} height={32} borderRadius={20} wrapper={FilterBox}/> :
                <ul id="with_genres" className={s.genresList}>
                {genreList.map((genreItem) => {
                    const isSelected = genres.includes(String(genreItem.id));

                    return (
                        <li key={genreItem.id}>
                            <button
                                type="button"
                                onClick={() => toggleGenre(String(genreItem.id))}
                                className={isSelected ? s.selected : s.default}
                            >
                                {genreItem.name}
                            </button>
                        </li>
                    );
                })}
            </ul>}

            <div style={{marginTop: 16}}>
                <h4 className={s.labelSort}>Rating range:</h4>
                <RatingRange
                    min={0}
                    max={10}
                    valueMin={Math.min(ratingFrom, ratingTo)}
                    valueMax={Math.max(ratingFrom, ratingTo)}
                    onMinChange={(value) => setRatingFrom(value)}
                    onMaxChange={(value) => setRatingTo(value)}
                />
            </div>
            <button className={s.reset} type="button" onClick={onReset}>Reset Filters</button>
        </form>
    );
};