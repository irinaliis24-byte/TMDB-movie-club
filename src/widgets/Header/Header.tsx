import s from './Header.module.css'
import logo from '@/../assets/logo.svg'
import {Path} from '@/app/routing';
import { NavLink } from 'react-router'

const navItems = [
    { to: Path.MainPage, label: 'Main Page' },
    { to: Path.CategoryMovies, label: 'Category Movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
]

export const Header = () => {
    return <div className={s.container}>
        <a href="#" className={s.logo}><img src={logo} alt="TMDB-logo"/></a>
        <nav>
            <ul className={s.list}>
                {navItems.map(item => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
}