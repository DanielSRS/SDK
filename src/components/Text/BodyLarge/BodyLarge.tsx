import { Text } from 'react-native';
import { useColors } from '../../../hooks/useColors';
import type { StyleProp, TextStyle, TextProps } from 'react-native';

export function BodyLarge(props: TextProps) {
  const colors = useColors();
  const textColor = { color: colors.textPrimary };

  return <Text {...props} style={[defaultStyles, props.style, textColor]} />;
}

const defaultStyles: StyleProp<TextStyle> = {
  fontSize: 18,
  lineHeight: 24,
};
