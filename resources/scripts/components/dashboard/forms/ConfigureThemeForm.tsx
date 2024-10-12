import React from 'react';
import tw from 'twin.macro';
import Switch from '@/components/elements/Switch';

export default () => {
    function toggleDarkMode() {
        const html = document.documentElement;
        const darkMode = html.classList.contains('dark');
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
        html.classList.toggle('dark');
    }

    return (
        <div>
            <p css={tw`text-sm`}>
                Customize the appearance of the Panel to your liking. This setting is stored in your browser and will be
                remembered on your next visit.
            </p>
            <div css={tw`mt-6`}>
                <Switch
                    name={'toggle_dark_mode'}
                    description={'Toggle dark mode for the Panel.'}
                    label={'Dark Mode'}
                    defaultChecked={document.documentElement.classList.contains('dark')}
                    onChange={() => toggleDarkMode()}
                />
            </div>
        </div>
    );
};
