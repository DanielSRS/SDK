import React, { useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { createContext } from '../../libs';
import type { ColorSchemeName } from 'react-native';

type ColorScheme = NonNullable<ColorSchemeName>;

interface ColorSchemeContextProps {
  systemColorScheme: ColorScheme;
  setAppColorScheme: (option: UserColorScheme) => void;
  colorScheme: ColorScheme;
  appColorScheme: UserColorScheme;
}

type UserColorScheme = 'system' | 'light' | 'dark';

export const ColorSchemeContext = createContext({} as ColorSchemeContextProps);

const updateScheme =
  (d: (c: UserColorScheme) => void) => (c: UserColorScheme) => {
    switch (c) {
      case 'dark':
        Appearance.setColorScheme('dark');
        break;
      case 'light':
        Appearance.setColorScheme('light');
        break;
      default:
        Appearance.setColorScheme(null);
        break;
    }
    d(c);
  };

const useColorSchemeData = (): ColorSchemeContextProps => {
  const systemColorScheme = useColorScheme() || 'light';
  const [appColorScheme, setAppColorScheme] =
    useState<UserColorScheme>('system');
  const colorScheme: NonNullable<ColorSchemeName> =
    appColorScheme === 'system' ? systemColorScheme : appColorScheme;

  return {
    colorScheme,
    systemColorScheme,
    setAppColorScheme: updateScheme(setAppColorScheme),
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
