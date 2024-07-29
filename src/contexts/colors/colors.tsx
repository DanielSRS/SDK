import { useColorScheme } from '../../hooks/useColorSheme';
import { createContext } from '../../libs';
import type { ColorValue } from 'react-native';
import type { ReactNode, FC } from 'react';

type ColorTokens = 'appBackground' | 'appForeground' | 'textPrimary';

type Colors = {
  readonly [key in ColorTokens]: ColorValue;
};

interface ColorsContextProps {
  colors: Colors;
}

export const ColorsContext = createContext({} as ColorsContextProps);

const useColorsData = (): ColorsContextProps => {
  const colorSheme = useColorScheme();
  const colors =
    colorSheme === 'light' ? DEFAULT_LIGHT_COLORS : DEFAULT_DARK_COLORS;

  return {
    colors,
  };
};

export const ColorsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const data = useColorsData();

  return (
    <ColorsContext.Provider value={data}>{children}</ColorsContext.Provider>
  );
};

const DEFAULT_LIGHT_COLORS: Colors = {
  appBackground: '#FFFFFF',
  appForeground: '#000000',
  textPrimary: '#000000E4',
};
const DEFAULT_DARK_COLORS: Colors = {
  appBackground: '#000000',
  appForeground: '#FFFFFF',
  textPrimary: '#FFFFFF',
};
