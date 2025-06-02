import React, { useRef } from 'react';
import {
  Appearance,
  Dimensions,
  Platform,
  PlatformColor,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';
import { observable, ObservableHint } from '@legendapp/state';
import { use$, useMount } from '@legendapp/state/react';
import { Constants } from '../../utils/constants';
import { SystemColorScheme$ } from '../../contexts/colorScheme/color-scheme';
import type { LayoutChangeEvent } from 'react-native';

const INITAL_COLOR_SCHEME = Appearance.getColorScheme() ?? 'light';

const SUPORTS_WINDOW = Platform.OS === 'macos' || Platform.OS === 'windows';

export const RootViewRef$ = observable<React.RefObject<View>>();

interface AppBackgroundProps {
  children: React.ReactNode;
  transparentBackground?: boolean;
  useAcrylic?: boolean;
}

/**
 * AppBackground is a component that provides a background for the application.
 * It supports acrylic effects on Windows and can be transparent.
 * It also handles color scheme mismatches between the system and the app.
 * It should be used as the root view of the application.
 */
export const AppBackground = (props: AppBackgroundProps) => {
  const {
    children,
    transparentBackground = Constants.IS_WINDOWS ? false : undefined,
    useAcrylic = Constants.IS_WINDOWS,
  } = props;
  const rootViewRef = useRef<View>(null);
  const systemScheme = use$(SystemColorScheme$);
  const currentTheme = useColorScheme();
  const colorSchemeMismatch = currentTheme !== systemScheme;
  useMount(() => {
    RootViewRef$.set(ObservableHint.opaque(rootViewRef));
  });
  const colors = useColors();
  const isDark = currentTheme === 'dark';
  const backgroundColor = {
    backgroundColor:
      useAcrylic && Constants.IS_WINDOWS
        ? AcrylicBrush(
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
          )
        : colors.backgroundFillColorSolidBackgroundBase,
  };

  const showBgColor = !(transparentBackground ?? SUPORTS_WINDOW);

  return (
    <View
      ref={rootViewRef}
      onLayout={updateRootViewDimensions}
      style={[
        styles.appContainer,
        // { paddingTop: statusbarHeight },
        showBgColor && backgroundColor,
      ]}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

interface RootSDKViewDimensions {
  /**
   * Root view start x position relative to window dimensions
   */
  x: number;
  /**
   * Root view start y position relative to window dimensions
   */
  y: number;
  /**
   * Root view height
   */
  height: number;
  /**
   * Root view width
   */
  width: number;
  left?: number;
  top?: number;
}

export const RootSDKViewDimensions$ = observable<RootSDKViewDimensions>({
  ...Dimensions.get('window'),
  x: 0,
  y: 0,
  left: 0,
  top: 0,
});

const updateRootViewDimensions = (event: LayoutChangeEvent) => {
  const layout = event.nativeEvent.layout;
  RootSDKViewDimensions$.set(layout);
};

// https://github.com/microsoft/microsoft-ui-xaml/blob/6aed8d97fdecfe9b19d70c36bd1dacd9c6add7c1/dev/Materials/Acrylic/AcrylicBrush_19h1_themeresources.xaml#L11

function AcrylicBrush(name: PreDefinedAcrylicBrush) {
  return PlatformColor(name);
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
