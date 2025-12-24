import { useContext } from 'react';
import { AppBackgroundContext } from '../components/AppBackground/AppBackground';

export function useRootViewRef$() {
  return useContext(AppBackgroundContext).rootViewRef$;
}
