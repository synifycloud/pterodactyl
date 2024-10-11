import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`h-screen fixed left-0 top-0 bg-neutral-900 dark:bg-neutral-800 shadow overflow-y-auto z-50 xl:w-[240px] w-[60px] duration-300 overflow-hidden`};

    & > div {
        ${tw`flex flex-col items-center text-sm mx-auto px-2`};

        & > a,
        & > div {
            ${tw`inline-block py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-all duration-150`};

            &:hover {
                ${tw`text-neutral-100`};
            }

            &:active,
            &.active {
                ${tw`text-neutral-100`};
                box-shadow: inset 0 -2px ${theme`colors.indigo.600`.toString()};
            }
        }
    }
`;

export default SubNavigation;
