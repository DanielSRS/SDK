import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useColors } from '../../hooks/useColors';

export function HoverIndicator(props: {
  hoverStyles?: StyleProp<ViewStyle>;
  restStyles?: StyleProp<ViewStyle>;
}) {
  const colors = useColors();
  const {
    hoverStyles = {
      backgroundColor: colors.controlAltSecondary,
    },
    restStyles = {
      // backgroundColor: 'pink',
    },
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const mouseEvents = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const st = isHovered ? hoverStyles : restStyles;

  return (
    <Pressable
      {...mouseEvents}
      onPointerEnter={mouseEvents.onMouseEnter}
      onPointerLeave={mouseEvents.onMouseLeave}
      // onPress={onPress}
      // disabled={disabled}
      style={[StyleSheet.absoluteFill, st]}
    />
  );
}
