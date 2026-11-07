import type {PropsWithChildren} from 'react';

export const FilterBox = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 0.5,
                width: 200,
            }}
        >
            {children}
        </div>
    );
}
