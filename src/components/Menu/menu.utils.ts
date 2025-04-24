import { Appearance, PlatformColor, View } from 'react-native';
import type { useColorScheme } from '../../hooks/useColorSheme';
import {
  RootSDKViewDimensions$,
  RootViewRef$,
} from '../AppBackground/AppBackground';
import type { MutableRefObject, RefObject } from 'react';
import type { Layout } from './menu.types';

const INITAL_COLOR_SCHEME = Appearance.getColorScheme() ?? 'light';

export function measureViewInWindow(
  viewRef: RefObject<View>,
  layout: MutableRefObject<Layout>
) {
  return new Promise<Layout>((resolve, _reject) => {
    // const i = Date.now();
    const rootViewRef = RootViewRef$.peek()?.current;
    if (!rootViewRef) {
      return;
    }
    viewRef.current?.measureLayout(rootViewRef, (left, top, width, height) => {
      const sdkrootview = RootSDKViewDimensions$.peek();
      const _layout = {
        x: left,
        y: top,
        height,
        width,
        wh: sdkrootview.height,
        ww: sdkrootview.width,
      };
      resolve(_layout);
      layout.current = _layout;
    });
  });
}

function AcrylicBrush(name: PreDefinedAcrylicBrush) {
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
