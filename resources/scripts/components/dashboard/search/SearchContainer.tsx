import React, { useState } from 'react';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import { Search } from 'lucide-react';

export default () => {
    const [visible, setVisible] = useState(false);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
            if (!visible && e.metaKey && e.key.toLowerCase() === '/') {
                setVisible(true);
            }

            if (!visible && e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setVisible(true);
            }

            if (visible && e.key.toLowerCase() === 'escape') {
                e.preventDefault();
                setVisible(false);
            }
        }
    });

    return (
        <>
            {visible && <SearchModal appear visible={visible} onDismissed={() => setVisible(false)} />}
            <Tooltip placement={'bottom'} content={'Search'}>
                <div className={'navigation-link'} onClick={() => setVisible(true)}>
                    <Search width={20} />
                </div>
            </Tooltip>
        </>
    );
};
