import {Header} from '@/widgets/Header/Header.tsx';
import {Routing} from '@/app/routing';
import {Footer} from '@/widgets/Footer/Footer.tsx';
import s from './App.module.css'

function App() {

    return (
        <div>
            <Header/>
            <div className={s.pageWrapper}>
                <div className={s.container}>
                    <Routing/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default App