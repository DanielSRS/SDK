import { useColorScheme } from '../../hooks/useColorSheme';
import { createContext } from '../../libs';
import type { ColorValue } from 'react-native';
import type { ReactNode, FC } from 'react';

type ColorTokens =
  | 'appBackground'
  | 'appForeground'
  | 'textPrimary'
  | 'controlStrongStrokeDefault'
  | 'accentDefault'
  | 'textOnAccentPrimary'
  | 'controlAltTertiary'
  | 'accentSecondary'
  | 'controlAltQuarternary'
  | 'controlStrongStrokeDisabled'
  | 'accentTertiary'
  | 'textOnAccentSecondary'
  | 'controlAltDisabled'
  | 'accentDisabled'
  | 'textOnAccentDisabled'
  | 'textDisabled'
  | 'fillColorControlDefault'
  | 'fillColorControlSecondary'
  | 'fillColorControlTertiary'
  | 'fillColorTextPrimary'
  | 'fillColorTextSecondary'
  | 'fillColorControlDisabled'
  | 'fillColorTextDisabled'
  | 'controlAltSecondary';

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
  controlAltSecondary: 'rgba(0, 0, 0, 0.0241)',
  controlStrongStrokeDefault: 'rgba(0, 0, 0, 0.6063)',
  accentDefault: '#005FB8',
  textOnAccentPrimary: '#FFFFFF',
  controlAltTertiary: 'rgba(0, 0, 0, 0.0578)',
  accentSecondary: 'rgba(0, 95, 184, 0.9)',
  controlAltQuarternary: 'rgba(0, 0, 0, 0.0924)',
  controlStrongStrokeDisabled: 'rgba(0, 0, 0, 0.2169)',
  accentTertiary: 'rgba(0, 95, 184, 0.8)',
  textOnAccentSecondary: 'rgba(255, 255, 255, 0.7)',
  controlAltDisabled: 'rgba(255, 255, 255, 0)',
  accentDisabled: 'rgba(0, 0, 0, 0.2169)',
  textOnAccentDisabled: '#FFFFFF',
  textDisabled: 'rgba(0, 0, 0, 0.3628)',
  fillColorControlDefault: 'rgba(255, 255, 255, 0.7)',
  fillColorControlSecondary: 'rgba(249, 249, 249, 0.5)',
  fillColorTextPrimary: 'rgba(0, 0, 0, 0.8956)',
  fillColorControlTertiary: 'rgba(249, 249, 249, 0.3)',
  fillColorTextSecondary: 'rgba(0, 0, 0, 0.6063)',
  fillColorControlDisabled: 'rgba(249, 249, 249, 0.3)',
  fillColorTextDisabled: 'rgba(0, 0, 0, 0.3614)',
};
const DEFAULT_DARK_COLORS: Colors = {
  appBackground: '#000000',
  appForeground: '#FFFFFF',
  textPrimary: '#FFFFFF',
  controlAltSecondary: 'rgba(0, 0, 0, 0.1)',
  controlStrongStrokeDefault: 'rgba(255, 255, 255, 0.6047)',
  accentDefault: '#60CDFF',
  textOnAccentPrimary: '#000000',
  controlAltTertiary: 'rgba(0, 0, 0, 0.0419)',
  accentSecondary: 'rgba(96, 205, 255, 0.9)',
  controlAltQuarternary: 'rgba(255, 255, 255, 0.0698)',
  controlStrongStrokeDisabled: 'rgba(255, 255, 255, 0.1581)',
  accentTertiary: 'rgba(96, 205, 255, 0.8)',
  textOnAccentSecondary: 'rgba(0, 0, 0, 0.5)',
  controlAltDisabled: 'rgba(255, 255, 255, 0)',
  accentDisabled: 'rgba(255, 255, 255, 0.1581)',
  textOnAccentDisabled: 'rgba(255, 255, 255, 0.5302)',
  textDisabled: 'rgba(255, 255, 255, 0.3628)',
  fillColorControlDefault: 'rgba(255, 255, 255, 0.0605)',
  fillColorControlSecondary: 'rgba(255, 255, 255, 0.0837)',
  fillColorTextPrimary: 'rgba(255, 255, 255, 1)',
  fillColorControlTertiary: 'rgba(255, 255, 255, 0.0323)',
  fillColorTextSecondary: 'rgba(255, 255, 255, 0.786)',
  fillColorControlDisabled: 'rgba(255, 255, 255, 0.0419)',
  fillColorTextDisabled: 'rgba(255, 255, 255, 0.3628)',
};
