import s from './PersonItem.module.css'
import {default_posters, type ProfileSize} from '@/shared/constants';
import {Link} from 'react-router';
import type {Person} from '@/entities/movie/api/movieItemApi.types.ts';

type PersonItemProps = {
    person: Person
    baseUrl: string | undefined
    profileSize: ProfileSize
}

export const PersonItem = ({person, baseUrl, profileSize}: PersonItemProps) => {

    const posterSrc =
        baseUrl && person.profile_path
            ? `${baseUrl}${profileSize}${person.profile_path}`
            : default_posters.person_photo

    const imageAlt = person.name ? `${person.name} photo` : 'person photo'

    return <div className={s.itemContainer}>
        <div className={s.cover}>
            <Link to={'#'}>
                <img src={posterSrc} alt={imageAlt} className={s.poster}/>
            </Link>
        </div>
        <Link to={'#'} className={s.titleLink}>
            <h4 className={s.name}>{person.name}</h4>
            <p className={s.character}>{person.character}</p>
        </Link>
    </div>
}