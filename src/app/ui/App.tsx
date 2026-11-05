import {Header} from '@/widgets/Header/Header.tsx';
import {Routing} from '@/app/routing';
import {Footer} from '@/widgets/Footer/Footer.tsx';
import s from './App.module.css'
import {LinearProgress} from '@/shared/ui/LinearProgress/LinearProgress.tsx';
import {useGlobalLoading} from '@/shared/hooks/useGlobalLoading.ts';
import {Toaster} from 'react-hot-toast';

function App() {
    const isGlobalLoading = useGlobalLoading();

    return (
        <>
            <Toaster  position="top-right"/>
            <Header/>
            <div className={s.pageWrapper}>
                {isGlobalLoading && <LinearProgress/>}
                <div className={s.container}>
                    <Routing/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default App