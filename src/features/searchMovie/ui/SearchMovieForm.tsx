import s from './SearchMovieForm.module.css'

export const SearchMovieForm = () => {
    return <div className={s.searchForm}>
        <input type="text"/>
        <button>Search</button>
    </div>
}