import { Appearance, PlatformColor } from 'react-native';
import type { useColorScheme } from '../../hooks/useColorSheme';

const INITAL_COLOR_SCHEME = Appearance.getColorScheme() ?? 'light';

// https://github.com/microsoft/microsoft-ui-xaml/blob/6aed8d97fdecfe9b19d70c36bd1dacd9c6add7c1/dev/Materials/Acrylic/AcrylicBrush_19h1_themeresources.xaml#L11

export function AcrylicBrush(name: PreDefinedAcrylicBrush) {
  return PlatformColor(name);
}

export function MenuAcrylicBrush(
  systemScheme: 'light' | 'dark',
  currentTheme: ReturnType<typeof useColorScheme>
) {
  const colorSchemeMismatch = currentTheme !== systemScheme;
  return AcrylicBrush(
    (() => {
      if (colorSchemeMismatch) {
        if (currentTheme === INITAL_COLOR_SCHEME) {
          return 'AcrylicBackgroundFillColorDefaultBrush';
        }
        return 'AcrylicBackgroundFillColorDefaultInverseBrush';
      }
      if (systemScheme !== INITAL_COLOR_SCHEME) {
        return 'AcrylicBackgroundFillColorDefaultInverseBrush';
      }
      return 'AcrylicBackgroundFillColorDefaultBrush';
    })()
  );
}

type PreDefinedAcrylicBrush =
  | 'AcrylicBackgroundFillColorDefaultBrush'
  | 'AcrylicBackgroundFillColorDefaultInverseBrush'
  | 'AcrylicInAppFillColorDefaultInverseBrush'
  | 'AcrylicBackgroundFillColorBaseBrush'
  | 'AcrylicInAppFillColorBaseBrush'
  | 'AccentAcrylicBackgroundFillColorDefaultBrush'
  | 'AccentAcrylicInAppFillColorDefaultBrush'
  | 'AccentAcrylicBackgroundFillColorBaseBrush'
  | 'AccentAcrylicInAppFillColorBaseBrush'
  | 'AcrylicInAppFillColorDefaultBrush';
