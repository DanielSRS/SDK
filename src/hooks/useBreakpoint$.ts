import { useContext } from 'react';
import { BreakpointContext } from '../contexts/breakpoint/breakpoint';

export function useBreakpoints$() {
  const breakpoint$ = useContext(BreakpointContext);
  return breakpoint$;
}
