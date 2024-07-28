import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';

export const AppBackground = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useColorScheme();
  const isDark = currentTheme === 'dark';
  // const statusbarHeight = StatusBar.currentHeight;
  const backgroundColor = isDark
    ? styles.darkBackground
    : styles.lightBackground;

  return (
    <View
      style={[
        styles.appContainer,
        // { paddingTop: statusbarHeight },
        backgroundColor,
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
  lightBackground: {
    backgroundColor: '#F3F3F3',
  },
  darkBackground: {
    backgroundColor: '#333',
  },
});
