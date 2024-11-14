import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';

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

  const showBgColor = transparentBackground ?? !SUPORTS_WINDOW;

  return (
    <View
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
