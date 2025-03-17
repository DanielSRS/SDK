import { ScrollView, View, type ColorValue } from 'react-native';
import { Body, useColors } from '@danielsrs/react-native-sdk';

export const ColorsTokens = () => {
  const colorTokens = useColors();
  const colors = Object.entries(colorTokens);

  return <ScrollView style={column}>{colors.map(colorItem)}</ScrollView>;
};

const colorItem = (props: [colorName: string, color: ColorValue]) => {
  return (
    <View style={alignedRow} key={props[0]}>
      <Body>{props[0]}</Body>
      <View style={[color, { backgroundColor: props[1] }]} />
    </View>
  );
};

const alignedRow = {
  flexDirection: 'row',
  columnGap: 10,
  alignItems: 'center',
} as const;

const column = {
  rowGap: 10,
} as const;

const color = {
  width: 20,
  height: 20,
  borderRadius: 10,
} as const;
