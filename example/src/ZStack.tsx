import { Styled, ZStack } from '@danielsrs/react-native-sdk';

export function ZStackS() {
  return (
    <ZStack>
      <RedSquare />
      <GreenSquare />
      <BlueSquare />
    </ZStack>
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
