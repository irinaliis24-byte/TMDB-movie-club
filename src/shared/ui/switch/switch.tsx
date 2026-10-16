import s from './switch.module.css'

type Props = {
    callback: () => void
}

export const Switch = ({callback}: Props) => {
    const OnChangeHandler = () => {
        callback()
    }

    return <input type="checkbox" className={s.themeCheckbox} onChange={OnChangeHandler}/>
}