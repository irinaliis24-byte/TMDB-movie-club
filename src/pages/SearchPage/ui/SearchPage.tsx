import {SearchMovieForm} from '@/features/searchMovie';
import {useSearchParams} from 'react-router';
import {useSearchMoviesByTitleQuery} from '@/entities/movie/api/movieApi.ts';
import {MovieList} from '@/widgets/MovieList/MovieList.tsx';
import {useEffect, useState} from 'react';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1)

    const query = searchParams.get("query")?.trim() ?? "";
    const {
        data,
        isLoading,
        isFetching,
        isError,
} = useSearchMoviesByTitleQuery({query, page: currentPage}, {
        skip: !query,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const content = () => {
        if (!query) {
            return <p>Enter the name of the film to search.</p>;
        }

        if (isLoading || isFetching) {
            return <p>Searching...</p>;
        }

        if (isError) {
            return <p>Failed to load movies. Please try again.</p>;
        }

        const movies = data?.results ?? [];

        if (movies.length === 0) {
            return <p>No results found for the query “{query}”.</p>;
        }
        return ''
    }

    return (
        <div>
            <h2>Search</h2>
            <SearchMovieForm/>
            {content() || <MovieList movies={data?.results ?? []} currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={data?.total_pages}/>}
        </div>
    )
}