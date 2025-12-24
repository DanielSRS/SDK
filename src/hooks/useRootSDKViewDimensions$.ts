import { useContext } from 'react';
import { AppBackgroundContext } from '../components/AppBackground/AppBackground';

export function useRootSDKViewDimensions$() {
  return useContext(AppBackgroundContext).rootSDKViewDimensions$;
}
