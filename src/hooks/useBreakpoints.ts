import { observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import { RootSDKViewDimensions$ } from '../components/AppBackground/AppBackground';

const breakpoints = {
  SMALL_BREAKPOINT: 0,
  MEDIUM_BREAKPOINT: 1,
  LARGE_BREAKPOINT: 2,
  X_LARGE_BREAKPOINT: 3,
  XX_LARGE_BREAKPOINT: 4,
  XXX_LARGE_BREAKPOINT: 5,
} as const;
type BreakpointH = {
  SMALL_BREAKPOINT: 0;
  MEDIUM_BREAKPOINT: 1;
  LARGE_BREAKPOINT: 2;
  X_LARGE_BREAKPOINT: 3;
  XX_LARGE_BREAKPOINT: 4;
  XXX_LARGE_BREAKPOINT: 5;
};

const createBreakpoint = <T extends BreakpointNames, N extends number>(
  val: N,
  name: T
) => {
  // eslint-disable-next-line no-new-wrappers
  const v = new Number(val) as N & { name: T } & BreakpointH;
  v.name = name;
  v.SMALL_BREAKPOINT = breakpoints.SMALL_BREAKPOINT;
  v.MEDIUM_BREAKPOINT = breakpoints.MEDIUM_BREAKPOINT;
  v.LARGE_BREAKPOINT = breakpoints.LARGE_BREAKPOINT;
  v.X_LARGE_BREAKPOINT = breakpoints.X_LARGE_BREAKPOINT;
  v.XX_LARGE_BREAKPOINT = breakpoints.XX_LARGE_BREAKPOINT;
  v.XXX_LARGE_BREAKPOINT = breakpoints.XXX_LARGE_BREAKPOINT;
  return v;
};

const SMALL_BREAKPOINT = createBreakpoint(
  breakpoints.SMALL_BREAKPOINT,
  'small'
);
const MEDIUM_BREAKPOINT = createBreakpoint(
  breakpoints.MEDIUM_BREAKPOINT,
  'medium'
);
const LARGE_BREAKPOINT = createBreakpoint(
  breakpoints.LARGE_BREAKPOINT,
  'large'
);
const X_LARGE_BREAKPOINT = createBreakpoint(
  breakpoints.X_LARGE_BREAKPOINT,
  'x-large'
);
const XX_LARGE_BREAKPOINT = createBreakpoint(
  breakpoints.XX_LARGE_BREAKPOINT,
  'xx-large'
);
const XXX_LARGE_BREAKPOINT = createBreakpoint(
  breakpoints.XXX_LARGE_BREAKPOINT,
  'xxx-large'
);

/**
 * small
 * medium
 * large
 * x-large
 * xx-large
 * xxx-large
 */
type BreakpointNames =
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
  | 'xxx-large';

type Breakpoint =
  | typeof SMALL_BREAKPOINT
  | typeof MEDIUM_BREAKPOINT
  | typeof LARGE_BREAKPOINT
  | typeof X_LARGE_BREAKPOINT
  | typeof XX_LARGE_BREAKPOINT
  | typeof XXX_LARGE_BREAKPOINT;

/**
 * Current breackpoint
 */
export const Breakpoint$ = observable(() =>
  calculateBreakpoint(RootSDKViewDimensions$.width.get())
);

export function calculateBreakpoint(width: number): Breakpoint {
  if (width < 480) {
    return SMALL_BREAKPOINT;
  }

  if (width < 640) {
    return MEDIUM_BREAKPOINT;
  }

  if (width < 1024) {
    return LARGE_BREAKPOINT;
  }

  if (width < 1366) {
    return X_LARGE_BREAKPOINT;
  }

  if (width < 1920) {
    return XX_LARGE_BREAKPOINT;
  }

  return XXX_LARGE_BREAKPOINT;
}

export const useBreakpoints = (): Breakpoint => {
  const bp = use$(Breakpoint$);

  return bp;
};
