import s from './RatingLabel.module.css';

export const RatingLabel = ({voteAverage}: {voteAverage: number}) => {
    const bg = voteAverage >= 7 ? 'green' : voteAverage >= 5 ? '#feaf08' : 'red';

    return <span className={s.label} style={{backgroundColor: bg}}>{voteAverage.toFixed(1)}</span>
}