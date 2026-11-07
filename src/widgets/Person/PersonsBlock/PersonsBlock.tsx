import {BlockTitle} from '@/shared/ui/BlockTitle';
import s from './PersonsBlock.module.css'
import {PersonItem} from '@/widgets/Person/PersonItem/PersonItem.tsx';
import {profile_sizes} from '@/shared/constants';
import type {Person} from '@/entities/movie/api/movieItemApi.types.ts';

type Props = {
    baseUrl: string | undefined
    title?: string
    items: Person[]
}

export const PersonsBlock = ({title, items, baseUrl}: Props) => {
    return <section  className={s.wrapper}>
        <BlockTitle>{title}</BlockTitle>
        <div className={s.personBlock}>
            {items.map((actor, idx) => {
                if (idx < 6) {
                    return <PersonItem key={actor.id} person={actor} baseUrl={baseUrl}
                                       profileSize={profile_sizes.w185}/>
                }
            })}
        </div>
    </section>
}