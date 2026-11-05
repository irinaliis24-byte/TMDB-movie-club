import s from './BlockTitle.module.css'
import * as React from 'react';

type Props = {
    children?: React.ReactNode
}

export const BlockTitle = ({children}: Props) => {
    return <h2 className={s.blockTitle}>{children}</h2>
}