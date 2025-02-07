import { View } from 'react-native';
import { Styled } from 'react-native-sdk';

export function StyledExample() {
  return (
    <View>
      <RedSquare />
    </View>
  );
}

const RedSquare = Styled.createStyledView({
  width: 100,
  height: 100,
  backgroundColor: 'rgba(255, 0, 0, 0.3)',
});
