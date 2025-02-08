import React, { useRef } from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';
import { observable, ObservableHint } from '@legendapp/state';
import type { LayoutChangeEvent } from 'react-native';
import { useMount } from '@legendapp/state/react';

const SUPORTS_WINDOW = Platform.OS === 'macos' || Platform.OS === 'windows';

export const RootViewRef$ = observable<React.RefObject<View>>();

interface AppBackgroundProps {
  children: React.ReactNode;
  transparentBackground?: boolean;
}

export const AppBackground = (props: AppBackgroundProps) => {
  const { children, transparentBackground } = props;
  const rootViewRef = useRef<View>(null);
  const currentTheme = useColorScheme();
  useMount(() => {
    RootViewRef$.set(ObservableHint.opaque(rootViewRef));
  });
  const colors = useColors();
  const isDark = currentTheme === 'dark';
  const backgroundColor = {
    backgroundColor: colors.backgroundFillColorSolidBackgroundBase,
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
