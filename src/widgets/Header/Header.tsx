import s from './Header.module.css'
import logo from '@/../assets/logo.svg'
import {Path} from '@/app/routing';
import {Link, NavLink} from 'react-router'
import {Switch} from '@/shared/ui/switch/switch.tsx';
import {useAppDispatch, useAppSelector} from '@/app/model/hooks';
import {changeThemeModeAC, selectThemeMode} from '@/app/model';
import {useEffect} from 'react';

const navItems = [
    { to: Path.MainPage, label: 'Main Page' },
    { to: Path.CategoryMovies, label: 'Category Movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
]

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    //const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }

    return <header className={s.mainHeader}>
        <Link to={Path.MainPage} className={s.logo}><img src={logo} alt="TMDB-logo"/></Link>
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
        <Switch callback={changeMode}/>
    </header>
}