import type { useColorScheme } from '../../../hooks/useColorSheme';

export function AcrylicBrush(name: PreDefinedAcrylicBrush) {
  return name;
}

export function MenuAcrylicBrush(
  systemScheme: 'light' | 'dark',
  currentTheme: ReturnType<typeof useColorScheme>
) {
  systemScheme;
  currentTheme;
  return 'transparent';
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
