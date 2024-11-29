import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { useColors } from '../../hooks/useColors';

export function HoverIndicator(props: {
  hoverStyles?: StyleProp<ViewStyle>;
  restStyles?: StyleProp<ViewStyle>;
}) {
  const colors = useColors();
  const {
    hoverStyles = {
      backgroundColor: colors.fillColorSubtleSecondary,
      // backgroundColor: 'pink',
    },
    restStyles = {
      backgroundColor: colors.fillColorSubtleTransparent,
      borderRadius: 3,
    },
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const mouseEvents = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return (
    <View
      {...mouseEvents}
      style={[
        StyleSheet.absoluteFill,
        restStyles,
        isHovered ? hoverStyles : {},
      ]}
    />
  );
}
