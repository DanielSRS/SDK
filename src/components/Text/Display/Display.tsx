import { Text } from 'react-native';
import { useColors } from '../../../hooks/useColors';
import type { StyleProp, TextStyle, TextProps } from 'react-native';

export function Display(props: TextProps) {
  const colors = useColors();
  const textColor = { color: colors.textPrimary };

  return <Text {...props} style={[defaultStyles, props.style, textColor]} />;
}

const defaultStyles: StyleProp<TextStyle> = {
  fontSize: 68,
  lineHeight: 92,
  fontWeight: '600', // semibold
};
