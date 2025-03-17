import { StyleSheet, View } from 'react-native';
import { useSchemeControl, Button } from '@danielsrs/react-native-sdk';

export function Theme() {
  const { setAppColorScheme } = useSchemeControl();

  return (
    <View style={styles.pageContainer}>
      {/* Color scheme control */}
      <View style={styles.themeSwitchGroup}>
        <Button
          onPress={() => {
            setAppColorScheme('dark');
          }}>
          Dark
        </Button>
        <Button
          onPress={() => {
            setAppColorScheme('light');
          }}>
          Light
        </Button>
        <Button
          onPress={() => {
            setAppColorScheme('system');
          }}>
          System
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },

  // groups
  themeSwitchGroup: {
    rowGap: 20,
    // display: 'none',
  },
});
