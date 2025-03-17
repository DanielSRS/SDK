import { StyleSheet, View } from 'react-native';
import { Body, Constants } from '@danielsrs/react-native-sdk';

export function ConstantsList() {
  return (
    <View style={styles.pageContainer}>
      <Body>IS_FABRIC_ENABLED: {Constants.IS_FABRIC_ENABLED + ''}</Body>
      <Body>SUPORTS_BOX_SHADOW: {Constants.SUPORTS_BOX_SHADOW + ''}</Body>
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
