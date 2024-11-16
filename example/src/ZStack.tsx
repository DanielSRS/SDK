import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Styled, ZStack } from 'react-native-sdk';

export function ZStackS() {
  const viewRef = useRef<View>(null);
  return (
    <View style={styles.pageContainer}>
      <ZStack ref={viewRef} style={styles.zStack}>
        <RedSquare />
        <GreenSquare />
        <BlueSquare />
      </ZStack>
    </View>
  );
}

const RedSquare = Styled.createStyledView({
  width: 100,
  height: 100,
  backgroundColor: 'rgba(255, 0, 0, 0.3)',
});

const GreenSquare = Styled.createStyledView({
  width: 100,
  height: 100,
  marginTop: 10,
  marginLeft: 10,
  backgroundColor: 'rgba(0, 255, 0, 0.3)',
});

const BlueSquare = Styled.createStyledView({
  width: 100,
  height: 100,
  marginTop: 20,
  marginLeft: 20,
  backgroundColor: 'rgba(0, 0, 255, 0.3)',
});

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },

  zStack: {
    height: 120,
  },
});
