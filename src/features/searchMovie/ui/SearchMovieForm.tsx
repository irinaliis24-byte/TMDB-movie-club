import s from './SearchMovieForm.module.css'
import {type SubmitEvent, useState} from 'react';
import {useNavigate} from 'react-router';
import {Path} from '@/app/routing';

export const SearchMovieForm = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const query = searchValue.trim();

        if (!query) return;

        navigate(`${Path.Search}?query=${encodeURIComponent(query)}`);
    };

    return <form className={s.searchForm} onSubmit={handleSubmit}>
        <input type="search" value={searchValue}
               onChange={(event) => setSearchValue(event.currentTarget.value)}
               placeholder="Search movie..."/>
        <button type="submit" disabled={!searchValue}>Search</button>
    </form>
}