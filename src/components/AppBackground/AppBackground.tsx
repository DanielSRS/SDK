import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';
import { observable } from '@legendapp/state';

const SUPORTS_WINDOW = Platform.OS === 'macos' || Platform.OS === 'windows';

interface AppBackgroundProps {
  children: React.ReactNode;
  transparentBackground?: boolean;
}
export const AppBackground = (props: AppBackgroundProps) => {
  const { children, transparentBackground } = props;
  const currentTheme = useColorScheme();
  const colors = useColors();
  const isDark = currentTheme === 'dark';
  const backgroundColor = {
    backgroundColor: colors.backgroundFillColorSolidBackgroundBase,
  };

  const showBgColor = !(transparentBackground ?? SUPORTS_WINDOW);

  return (
    <View
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
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  left: 0,
  top: 0,
});

const updateRootViewDimensions = (event: LayoutChangeEvent) => {
  const layout = event.nativeEvent.layout;
  RootSDKViewDimensions$.set(layout);
};
