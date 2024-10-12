import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import useFitText from 'use-fit-text';
import CopyOnClick from '@/components/elements/CopyOnClick';

interface StatBlockProps {
    title: string;
    copyOnClick?: string;
    color?: string | undefined;
    icon: any;
    children: React.ReactNode;
    className?: string;
}

export default ({ title, copyOnClick, icon, color, className, children }: StatBlockProps) => {
    const { fontSize, ref } = useFitText({ minFontSize: 8, maxFontSize: 500 });

    return (
        <CopyOnClick text={copyOnClick}>
            <div className={classNames(styles.stat_block, 'bg-white dark:bg-neutral-800', className)}>
                <div className={classNames(styles.status_bar, color || 'bg-white dark:bg-neutral-800')} />
                <div className={classNames(styles.icon, color || 'bg-neutral-100 dark:bg-neutral-700')}>
                    {React.createElement(icon, {
                        className: classNames({
                            'text-neutral-500 dark:text-gray-100': !color || color === 'bg-gray-700',
                            'text-neutral-500 dark:text-gray-50': color && color !== 'bg-gray-700',
                        }),
                    })}
                </div>
                <div className={'flex w-full flex-col justify-center overflow-hidden'}>
                    <p className={'font-header text-xs leading-tight text-gray-600 dark:text-gray-200 md:text-sm'}>
                        {title}
                    </p>
                    <div
                        ref={ref}
                        className={'h-[1.75rem] w-full truncate font-semibold text-gray-700 dark:text-gray-50'}
                        style={{ fontSize }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </CopyOnClick>
    );
};
