import { use$ } from '@legendapp/state/react';
import { createContext } from '../../libs';
import { Colors$ } from './colors.values';
import type { Colors } from './colors.types';
import type { ReactNode, FC } from 'react';

interface ColorsContextProps {
  colors: Colors;
}

export const ColorsContext = createContext({} as ColorsContextProps);

const useColorsData = (): ColorsContextProps => {
  const colors = use$(Colors$);

  return {
    colors,
  };
};

export const ColorsProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const data = useColorsData();

  return (
    <ColorsContext.Provider value={data}>{children}</ColorsContext.Provider>
  );
};
