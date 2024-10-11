import React, { useContext } from 'react';
import { DialogContext } from './';
import { useDeepCompareEffect } from '@/plugins/useDeepCompareEffect';

export default ({ children }: { children: React.ReactNode }) => {
    const { setFooter } = useContext(DialogContext);

    useDeepCompareEffect(() => {
        setFooter(
            <div className={'flex items-center justify-end space-x-3 rounded-b bg-gray-700 px-6 py-3'}>{children}</div>,
        );
    }, [children]);

    return null;
};
