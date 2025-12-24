import React, { createContext, useRef } from 'react';
import {
  Appearance,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';
import { observable, ObservableHint } from '@legendapp/state';
import { use$, useMount, useObservable } from '@legendapp/state/react';
import { Constants } from '../../utils/constants';
import { SystemColorScheme$ } from '../../contexts/colorScheme/color-scheme';
import { AcrylicBrush } from '../../api/acrylic-brush/acrylic-brush';
import type { LayoutChangeEvent } from 'react-native';
import type { Observable } from '@legendapp/state';

const INITAL_COLOR_SCHEME = Appearance.getColorScheme() ?? 'light';

const SUPORTS_WINDOW = Platform.OS === 'macos' || Platform.OS === 'windows';

interface AppBackgroundContextProps {
  rootViewRef$: Observable<React.RefObject<View> | undefined>;
}
export const AppBackgroundContext = createContext<AppBackgroundContextProps>(
  {} as AppBackgroundContextProps
);

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
  const rootViewRef$ = useObservable<React.RefObject<View>>();
  useMount(() => {
    rootViewRef$.set(ObservableHint.opaque(rootViewRef));
  });
  const colors = useColors();
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
    <AppBackgroundContext.Provider value={{ rootViewRef$ }}>
      <View
        ref={rootViewRef}
        onLayout={updateRootViewDimensions}
        style={[
          styles.appContainer,
          // { paddingTop: statusbarHeight },
          showBgColor && backgroundColor,
        ]}>
        {children}
      </View>
    </AppBackgroundContext.Provider>
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
