import React from 'react';
import { use$ } from '@legendapp/state/react';
import { createContext } from '../../libs';
import type { ColorScheme, UserColorScheme } from './color-scheme.types';
import {
  AppColorScheme$,
  ColorScheme$,
  SystemColorScheme$,
  SetColorScheme,
} from './color-scheme';

interface ColorSchemeContextProps {
  systemColorScheme: ColorScheme;
  setAppColorScheme: (option: UserColorScheme) => void;
  colorScheme: ColorScheme;
  appColorScheme: UserColorScheme;
}

export const ColorSchemeContext = createContext({} as ColorSchemeContextProps);

const useColorSchemeData = (): ColorSchemeContextProps => {
  const colorScheme = use$(ColorScheme$);
  const systemColorScheme = use$(SystemColorScheme$);
  const appColorScheme = use$(AppColorScheme$);

  return {
    colorScheme,
    systemColorScheme,
    setAppColorScheme: SetColorScheme,
    appColorScheme,
  };
};

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useColorSchemeData();

  return (
    <ColorSchemeContext.Provider value={data}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
