import {Header} from '@/widgets/Header/Header.tsx';
import {Routing} from '@/app/routing';
import {Footer} from '@/widgets/Footer/Footer.tsx';
import s from './App.module.css'

function App() {

  return (
    <div className={s.pageWrapper}>
        <Header />
        <div className={s.container}>
            <Routing/>
        </div>
        <Footer />
    </div>
  )
}

export default App

//
// src/
// ├── app/
// ├── pages/
// │   ├── MainPage/
// │   ├── CategoryMoviesPage/
// │   ├── FilteredMoviesPage/
// │   ├── SearchPage/
// │   └── FavoritesPage/
// │
// ├── widgets/
// │   ├── Header/
// │   ├── MovieList/
// │   └── MovieFilters/
// │
// ├── features/
// │   ├── searchMovie/
// │   ├── filterMovies/
// │   ├── sortMovies/
// │   └── addToFavorites/
// │
// ├── entities/
// │   └── movie/
// │
// └── shared/
//     ├── ui/
//     ├── api/
//     ├── lib/
//     └── styles/