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
  | 'fillColorControlSecondary'
  | 'fillColorControlTertiary'
  | 'fillColorControlDisabled'
  | 'fillColorTextDisabled'
  | 'fillColorTextPrimary'
  | 'fillColorTextSecondary'
  | 'fillColorAccentTextPrimary'
  | 'fillColorTextOnAccentPrimary'
  | 'fillColorControlDefault'
  | 'fillColorControlStrongDefault'
  | 'fillColorControlAltSecondary'
  | 'fillColorControlAltTertiary'
  | 'fillColorSubtleTransparent'
  | 'fillColorSubtleSecondary'
  | 'fillColorAccentDefault'
  | 'fillColorControlSolidDefault'
  | 'fillColorSystemCritical'
  | 'fillColorSystemCriticalBackground'
  | 'fillColorControlOnImageDefault'
  | 'strokeColorControlStrongStrokeDefault'
  | 'strokeColorDividerStrokeDefault'
  | 'strokeColorSurfaceStrokeDefault'
  | 'strokeColorCardStrokeDefault'
  | 'strokeColorFocusStrokeInner'
  | 'backgroundFillColorCardBackgroundDefault'
  | 'backgroundFillColorCardBackgroundSecondary'
  | 'backgroundFillColorSmokeDefault'
  | 'backgroundFillColorLayerDefault'
  | 'backgroundFillColorLayerOnAcrylicDefault'
  | 'backgroundFillColorAcrylicBackgroundDefault'
  | 'backgroundFillColorAcrylicBackgroundBase'
  | 'backgroundFillColorAccentAcrylicBackgroundBase'
  | 'backgroundFillColorLayerOnMicaBaseAltDefault'
  | 'backgroundFillColorMicaBackgroundBase'
  | 'backgroundFillColorSolidBackgroundBase'
  | 'backgroundFillColorSolidBackgroundSecondary'
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
  fillColorControlSecondary: 'rgba(249, 249, 249, 0.5)',
  fillColorControlTertiary: 'rgba(249, 249, 249, 0.3)',
  fillColorControlDisabled: 'rgba(249, 249, 249, 0.3)',
  fillColorTextDisabled: 'rgba(0, 0, 0, 0.3614)',

  fillColorTextPrimary: 'rgba(0, 0, 0, 0.8956)',
  fillColorTextSecondary: 'rgba(0, 0, 0, 0.6063)',
  fillColorAccentTextPrimary: 'rgb(0, 62, 146)',
  fillColorTextOnAccentPrimary: 'rgb(255, 255, 255)',
  fillColorControlDefault: 'rgba(255, 255, 255, 0.7)',
  fillColorControlStrongDefault: 'rgba(0, 0, 0, 0.45)',
  fillColorSubtleTransparent: 'rgba(255, 255, 255, 0)',
  fillColorSubtleSecondary: 'rgba(0, 0, 0, 0.04)',
  fillColorControlSolidDefault: 'rgb(255, 255, 255)',
  fillColorControlAltSecondary: 'rgba(0, 0, 0, 0.02)',
  fillColorControlAltTertiary: 'rgba(0, 0, 0, 0.06)',
  fillColorAccentDefault: 'rgb(0, 95, 184)',
  fillColorSystemCritical: 'rgb(196, 43, 28)',
  fillColorSystemCriticalBackground: 'rgb(253, 231, 233)',
  fillColorControlOnImageDefault: 'rgba(255, 255, 255, 0.79)',
  strokeColorControlStrongStrokeDefault: 'rgba(0, 0, 0, 0.61)',
  strokeColorCardStrokeDefault: 'rgba(0, 0, 0, 0.06)',
  strokeColorDividerStrokeDefault: 'rgba(0, 0, 0, 0.08)',
  strokeColorSurfaceStrokeDefault: 'rgba(117, 117, 117, 0.4)',
  strokeColorFocusStrokeInner: 'rgb(255, 255, 255)',
  backgroundFillColorCardBackgroundDefault: 'rgba(255, 255, 255, 0.7)',
  backgroundFillColorCardBackgroundSecondary: 'rgba(246, 246, 246, 0.5)',
  backgroundFillColorSmokeDefault: 'rgba(0, 0, 0, 0.3)',
  backgroundFillColorLayerDefault: 'rgba(255, 255, 255, 0.5)',
  backgroundFillColorLayerOnAcrylicDefault: 'rgba(255, 255, 255, 0.25)',
  backgroundFillColorLayerOnMicaBaseAltDefault: 'rgba(255, 255, 255, 0.7)',
  backgroundFillColorAcrylicBackgroundDefault: 'rgba(252, 252, 252, 0)',
  backgroundFillColorAcrylicBackgroundBase: 'rgba(243, 243, 243, 0)',
  backgroundFillColorAccentAcrylicBackgroundBase: 'rgba(153, 235, 255, 0.8)',
  backgroundFillColorMicaBackgroundBase: 'rgba(243, 243, 243, 0.5)',
  backgroundFillColorSolidBackgroundBase: 'rgb(243, 243, 243)',
  backgroundFillColorSolidBackgroundSecondary: 'rgb(238, 238, 238)',
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
  fillColorControlSecondary: 'rgba(255, 255, 255, 0.0837)',
  fillColorControlTertiary: 'rgba(255, 255, 255, 0.0323)',
  fillColorControlDisabled: 'rgba(255, 255, 255, 0.0419)',
  fillColorTextDisabled: 'rgba(255, 255, 255, 0.3628)',

  fillColorTextPrimary: 'rgb(255, 255, 255)',
  fillColorTextSecondary: 'rgba(255, 255, 255, 0.786)',
  fillColorAccentTextPrimary: 'rgb(153, 235, 255)',
  fillColorTextOnAccentPrimary: 'rgb(0, 0, 0)',
  fillColorControlDefault: 'rgba(255, 255, 255, 0.0605)',
  fillColorControlStrongDefault: 'rgba(255, 255, 255, 0.54)',
  fillColorControlAltSecondary: 'rgba(0, 0, 0, 0.1)',
  fillColorControlAltTertiary: 'rgba(0, 0, 0, 0.06)',
  fillColorSubtleTransparent: 'rgba(255, 255, 255, 0)',
  fillColorSubtleSecondary: 'rgba(255, 255, 255, 0.06)',
  fillColorAccentDefault: 'rgb(96, 205, 255)',
  fillColorControlSolidDefault: 'rgb(69, 69, 69)',
  fillColorSystemCritical: 'rgb(255, 153, 164)',
  fillColorSystemCriticalBackground: 'rgb(68, 39, 38)',
  fillColorControlOnImageDefault: 'rgba(28, 28, 28, 0.7)',
  strokeColorControlStrongStrokeDefault: 'rgba(255, 255, 255, 0.6)',
  strokeColorDividerStrokeDefault: 'rgba(255, 255, 255, 0.08)',
  strokeColorSurfaceStrokeDefault: 'rgba(117, 117, 117, 0.4)',
  strokeColorCardStrokeDefault: 'rgba(0, 0, 0, 0.1)',
  strokeColorFocusStrokeInner: 'rgba(0, 0, 0, 0.7)',
  backgroundFillColorCardBackgroundDefault: 'rgba(255, 255, 255, 0.05)',
  backgroundFillColorCardBackgroundSecondary: 'rgba(255, 255, 255, 0.03)',
  backgroundFillColorSmokeDefault: 'rgba(0, 0, 0, 0.3)',
  backgroundFillColorLayerDefault: 'rgba(58, 58, 58, 0.3)',
  backgroundFillColorLayerOnAcrylicDefault: 'rgba(255, 255, 255, 0.04)',
  backgroundFillColorAcrylicBackgroundDefault: 'rgba(44, 44, 44, 0.15)',
  backgroundFillColorAcrylicBackgroundBase: 'rgba(32, 32, 32, 0.5)',
  backgroundFillColorAccentAcrylicBackgroundBase: 'rgba(0, 63, 146, 0.8)',
  backgroundFillColorLayerOnMicaBaseAltDefault: 'rgba(58, 58, 58, 0.45)',
  backgroundFillColorMicaBackgroundBase: 'rgba(32, 32, 32, 0.8)',
  backgroundFillColorSolidBackgroundBase: 'rgb(32, 32, 32)',
  backgroundFillColorSolidBackgroundSecondary: 'rgb(28, 28, 28)',
};
