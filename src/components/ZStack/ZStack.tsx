import React, { useMemo, memo, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';

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

const AbsolutePositioned = (children: React.ReactNode, zIndex: number) => {
  return <View style={[StyleSheet.absoluteFill, { zIndex }]}>{children}</View>;
};

const zStackContainerStyle: ViewProps['style'] = {
  overflow: 'hidden',
  flex: 1,
};
