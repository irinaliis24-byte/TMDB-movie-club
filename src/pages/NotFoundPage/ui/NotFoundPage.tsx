import {ButtonLink} from '@/shared/ui/ButtonLink';
import {Path} from '@/app/routing';
import s from './NotFoundPage.module.css'

export const NotFoundPage = () => {
    return (
        <div className={s.notFoundPage}>
            <h2 className={s.title}>404</h2>
            <p className={s.subtitle}>Page Not Found</p>
            <ButtonLink path={Path.MainPage}>Go to main page</ButtonLink>
        </div>
    )
}