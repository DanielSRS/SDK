import { Text } from 'react-native';
import { useColors } from '../../../hooks/useColors';
import type { StyleProp, TextStyle, TextProps } from 'react-native';

export function Title(props: TextProps) {
  const colors = useColors();
  const textColor = { color: colors.textPrimary };

  return <Text {...props} style={[defaultStyles, props.style, textColor]} />;
}

const defaultStyles: StyleProp<TextStyle> = {
  fontSize: 28,
  lineHeight: 36,
  fontWeight: '600', // semibold
};
