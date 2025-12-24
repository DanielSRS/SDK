import { useSelector } from '@legendapp/state/react';
import { useBreakpoints$ } from './useBreakpoint$';

export const useBreakpoints = () => {
  return useSelector(useBreakpoints$());
};
