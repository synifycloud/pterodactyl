import styled, { css } from 'styled-components/macro';
import tw from 'twin.macro';

export interface Props {
    isLight?: boolean;
    hasError?: boolean;
}

const light = css<Props>`
    ${tw`bg-white border-neutral-200 text-neutral-800`};
    &:focus {
        ${tw`border-primary-400`}
    }

    &:disabled {
        ${tw`bg-neutral-100 border-neutral-200`};
    }
`;

const checkboxStyle = css<Props>`
    ${tw`bg-indigo-100 dark:bg-indigo-900/20 cursor-pointer appearance-none inline-block align-middle select-none flex-shrink-0 w-4 h-4 text-indigo-600 border border-indigo-300 dark:border-indigo-700 rounded-sm`};
    color-adjust: exact;
    background-origin: border-box;
    transition:
        all 75ms linear,
        box-shadow 25ms linear;

    &:checked {
        ${tw`border-transparent bg-no-repeat bg-center`};
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-color: currentColor;
        background-size: 100% 100%;
    }

    &:focus {
        ${tw`outline-none border-indigo-300 dark:border-indigo-600`};
        box-shadow: 0 0 0 1px rgba(9, 103, 210, 0.25);
    }
`;

const inputStyle = css<Props>`
    // Reset to normal styling.
    resize: none;
    ${tw`appearance-none outline-none w-full min-w-0`};
    ${tw`p-3 border-2 rounded text-sm transition-all duration-150`};
    ${tw`dark:bg-neutral-700 bg-white text-neutral-700 dark:text-neutral-200 shadow-md focus:ring-0`};
    ${tw`dark:border-neutral-500 hover:dark:border-neutral-400 shadow-md hover:shadow-lg`}

    & + .input-help {
        ${tw`mt-1 text-xs`};
        ${(props) =>
            props.hasError ? tw`text-red-500 dark:text-red-200` : tw`text-neutral-600 dark:text-neutral-200`};
    }

    &:required,
    &:invalid {
        ${tw`shadow-none`};
    }

    &:not(:disabled):not(:read-only):focus {
        ${tw`shadow-md border-indigo-300`};
        ${(props) => props.hasError && tw`border-red-300`};
    }

    &:disabled {
        ${tw`opacity-75`};
    }

    ${(props) => props.isLight && light};
    ${(props) => props.hasError && tw`text-red-100 border-red-400 hover:border-red-300`};
`;

const Input = styled.input<Props>`
    &:not([type='checkbox']):not([type='radio']) {
        ${inputStyle};
    }

    &[type='checkbox'],
    &[type='radio'] {
        ${checkboxStyle};

        &[type='radio'] {
            ${tw`rounded-full`};
        }
    }
`;
const Textarea = styled.textarea<Props>`
    ${inputStyle}
`;

export { Textarea };
export default Input;
