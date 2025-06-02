import React, { useMemo, memo, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';

/**
 * ZStack is a component that allows you to stack children on
 * top of each other.
 *
 * It extends all properties of a View.
 */
export const ZStack = memo(
  forwardRef<View, ViewProps>((props, ref) => {
    const { children, style, ...rest } = props;

    const childs = useMemo(
      () => React.Children.map(children, AbsolutePositioned),
      [children]
    );

    return (
      <View ref={ref} {...rest} style={[zStackContainerStyle, style]}>
        {childs}
      </View>
    );
  })
);

/**
 * AbsolutePositioned is a helper function that wraps children in a View
 * with absolute positioning and a specified zIndex.
 *
 * @param children - The children to be wrapped.
 * @param zIndex - The zIndex for the absolute positioned view.
 */
const AbsolutePositioned = (children: React.ReactNode, zIndex: number) => {
  return <View style={[StyleSheet.absoluteFill, { zIndex }]}>{children}</View>;
};

const zStackContainerStyle: ViewProps['style'] = {
  overflow: 'hidden',
  flex: 1,
};
