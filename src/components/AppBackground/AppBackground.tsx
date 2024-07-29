import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorSheme';
import { useColors } from '../../hooks/useColors';

export const AppBackground = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useColorScheme();
  const colors = useColors();
  const isDark = currentTheme === 'dark';
  const backgroundColor = { backgroundColor: colors.appBackground };

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
});
