import { Text } from 'react-native';
import { useColors } from '../../../hooks/useColors';
import type { StyleProp, TextStyle, TextProps } from 'react-native';

export function Caption(props: TextProps) {
  const colors = useColors();
  const textColor = { color: colors.textPrimary };

  return <Text {...props} style={[defaultStyles, textColor, props.style]} />;
}

const defaultStyles: StyleProp<TextStyle> = {
  fontSize: 12,
  lineHeight: 16,
};
