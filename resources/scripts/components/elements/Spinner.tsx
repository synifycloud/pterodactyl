import React, { Suspense } from 'react';
import tw from 'twin.macro';
import ErrorBoundary from '@/components/elements/ErrorBoundary';

export type SpinnerSize = 'small' | 'base' | 'large';

interface Props {
    size?: SpinnerSize;
    centered?: boolean;
    isBlue?: boolean;
}

interface Spinner extends React.FC<Props> {
    Size: Record<'SMALL' | 'BASE' | 'LARGE', SpinnerSize>;
    Suspense: React.FC<Props>;
}

const Spinner: Spinner = ({ centered, ...props }) =>
    centered ? (
        <div css={[tw`flex justify-center items-center`, props.size === 'large' ? tw`m-20` : tw`m-6`]}>
            <svg xmlns='http://www.w3.org/2000/svg' id='Layer_2' data-name='Layer 2' viewBox='0 0 638.67 232.98'>
                <path
                    d='m0,222.31l82.1-90.31c2.93-3.22,6.98-5.2,11.33-5.53l21.28-1.61c3.93-.3,7.6-2.07,10.28-4.97l51.65-54.8c.76-.81,2.02-.88,2.87-.16l47.61,40.56c2.75,2.34,6.83,2.15,9.35-.43l53.24-54.42c1.47-1.5,3.45-2.41,5.55-2.55l7.8-.51c2.72-.18,5.25-1.49,6.96-3.62L344.37,1.18c1.21-1.51,3.48-1.58,4.78-.16l115.95,126.5c3.38,3.69,9.16,3.76,12.64.17l11.65-12.04c1.1-1.13,2.87-1.24,4.1-.25l145.17,117.58-143.86-71.27c-4.51-2.24-9.8-2.28-14.36-.13l-20.58,9.74c-6.67,3.16-14.4,3.16-21.07,0-17.78-8.43-51.99-24.69-53.47-25.68-2-1.33-29.83-20.43-42.67-21.33-11.39-.8-26.48,13.37-35.24,18.6-1,.6-2.15-.49-1.63-1.53l12.05-24.1c5.4-10.79,12.58-20.6,21.24-29.01l.56-.54c5.5-5.34,7.39-13.39,4.84-20.62l-.36-1.03c-2.28-6.46-5.75-12.44-10.23-17.63l-.68-.79c-2.85-3.3-7.87-3.61-11.1-.67l-133.86,121.86c-.55.5-1.43.06-1.36-.69l1.77-16.54.86-8.62c1.19-11.94,4.48-23.58,9.71-34.38h0c1.25-2.58.67-5.67-1.42-7.63l-14.32-13.43c-1.94-1.82-4.99-1.76-6.86.13l-43.5,44.07c-2.86,2.9-6.75,4.57-10.82,4.65l-21.74.43c-3.81.07-7.47,1.52-10.3,4.07L0,222.31Z'
                    fill='none'
                    className='stroke-accent'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeDasharray='500 200'
                    strokeDashoffset='0'
                >
                    <animate
                        attributeName='stroke-dashoffset'
                        calcMode='spline'
                        dur='1.5s'
                        values='700;0'
                        keySplines='0.42 0 0.58 1'
                        repeatCount='indefinite'
                        keyTimes='0;1'
                    ></animate>
                </path>
            </svg>
        </div>
    ) : (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            id='Layer_2'
            data-name='Layer 2'
            viewBox='0 0 638.67 232.98'
            className='w-40 stroke-indigo-600 text-indigo-600'
        >
            <path
                d='m0,222.31l82.1-90.31c2.93-3.22,6.98-5.2,11.33-5.53l21.28-1.61c3.93-.3,7.6-2.07,10.28-4.97l51.65-54.8c.76-.81,2.02-.88,2.87-.16l47.61,40.56c2.75,2.34,6.83,2.15,9.35-.43l53.24-54.42c1.47-1.5,3.45-2.41,5.55-2.55l7.8-.51c2.72-.18,5.25-1.49,6.96-3.62L344.37,1.18c1.21-1.51,3.48-1.58,4.78-.16l115.95,126.5c3.38,3.69,9.16,3.76,12.64.17l11.65-12.04c1.1-1.13,2.87-1.24,4.1-.25l145.17,117.58-143.86-71.27c-4.51-2.24-9.8-2.28-14.36-.13l-20.58,9.74c-6.67,3.16-14.4,3.16-21.07,0-17.78-8.43-51.99-24.69-53.47-25.68-2-1.33-29.83-20.43-42.67-21.33-11.39-.8-26.48,13.37-35.24,18.6-1,.6-2.15-.49-1.63-1.53l12.05-24.1c5.4-10.79,12.58-20.6,21.24-29.01l.56-.54c5.5-5.34,7.39-13.39,4.84-20.62l-.36-1.03c-2.28-6.46-5.75-12.44-10.23-17.63l-.68-.79c-2.85-3.3-7.87-3.61-11.1-.67l-133.86,121.86c-.55.5-1.43.06-1.36-.69l1.77-16.54.86-8.62c1.19-11.94,4.48-23.58,9.71-34.38h0c1.25-2.58.67-5.67-1.42-7.63l-14.32-13.43c-1.94-1.82-4.99-1.76-6.86.13l-43.5,44.07c-2.86,2.9-6.75,4.57-10.82,4.65l-21.74.43c-3.81.07-7.47,1.52-10.3,4.07L0,222.31Z'
                fill='none'
                className='stroke-accent'
                strokeWidth='3'
                strokeLinecap='round'
                strokeDasharray='500 200'
                strokeDashoffset='0'
            >
                <animate
                    attributeName='stroke-dashoffset'
                    calcMode='spline'
                    dur='1.5s'
                    values='700;0'
                    keySplines='0.42 0 0.58 1'
                    repeatCount='indefinite'
                    keyTimes='0;1'
                ></animate>
            </path>
        </svg>
    );
Spinner.displayName = 'Spinner';

Spinner.Size = {
    SMALL: 'small',
    BASE: 'base',
    LARGE: 'large',
};

Spinner.Suspense = ({ children, centered = true, size = Spinner.Size.LARGE, ...props }) => (
    <Suspense fallback={<Spinner centered={centered} size={size} {...props} />}>
        <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
);
Spinner.Suspense.displayName = 'Spinner.Suspense';

export default Spinner;
