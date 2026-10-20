import {NavLink} from 'react-router';
import * as React from 'react';
import s from './ButtonLink.module.css'

type Props = {
    children: React.ReactNode;
    path: string;
}

export const ButtonLink = ({children, path}: Props) => {
    return <NavLink className={({ isActive }) =>`${s.button} ${isActive ? s.activeLink : ''}`} to={path}>{children}</NavLink>
}