import styles from './RatingRange.module.css';

type Props = {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
}

export const RatingRange = ({
                                min,
                                max,
                                valueMin,
                                valueMax,
                                onMinChange,
                                onMaxChange,
                            }: Props) => {
    const minPercent = ((valueMin - min) / (max - min)) * 100;
    const maxPercent = ((valueMax - min) / (max - min)) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.sliderWrapper}>
                <div className={styles.track} />

                <div
                    className={styles.range}
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                />

                <input
                    type="range"
                    className={styles.slider}
                    style={{ zIndex: valueMin > max - 0.1 ? 5 : 3 }}
                    min={min}
                    max={max}
                    step={0.1}
                    value={valueMin}
                    onChange={(e) => onMinChange(Number(e.target.value))}
                />

                <input
                    type="range"
                    className={styles.slider}
                    style={{ zIndex: 4 }}
                    min={min}
                    max={max}
                    step={0.1}
                    value={valueMax}
                    onChange={(e) => onMaxChange(Number(e.target.value))}
                />
            </div>

            <div className={styles.labels}>
                <span>{valueMin}</span>
                <span>{valueMax}</span>
            </div>
        </div>
    );
};