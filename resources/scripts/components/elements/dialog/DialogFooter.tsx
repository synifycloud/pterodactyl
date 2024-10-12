import React, { useContext } from 'react';
import { DialogContext } from './';
import { useDeepCompareEffect } from '@/plugins/useDeepCompareEffect';

export default ({ children }: { children: React.ReactNode }) => {
    const { setFooter } = useContext(DialogContext);

    useDeepCompareEffect(() => {
        setFooter(
            <div
                className={
                    'flex items-center justify-end space-x-3 rounded-b bg-neutral-100 px-6 py-3 dark:bg-neutral-700'
                }
            >
                {children}
            </div>,
        );
    }, [children]);

    return null;
};
