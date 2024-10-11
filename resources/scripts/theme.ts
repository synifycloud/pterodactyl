import { BreakpointFunction, createBreakpoint } from 'styled-components-breakpoint';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const breakpoint: BreakpointFunction<Breakpoints> = createBreakpoint<Breakpoints>({
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
});
