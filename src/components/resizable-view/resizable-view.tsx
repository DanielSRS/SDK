import { Memo, use$, useObservable } from '@legendapp/state/react';
import { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import type {
  LayoutRectangle,
  PanResponderInstance,
  ViewProps,
} from 'react-native';

interface ResizableContainerProps extends ViewProps {
  readonly maxWidthToResize?: number;
  readonly minWidthToResize?: number;
  readonly maxHeightToResize?: number;
  readonly minHeighToResize?: number;
  /**
   * Resize from right side
   */
  readonly fromRight?: boolean;
  /**
   * Resize from left side
   */
  readonly fromBottom?: boolean;
}

export const ResizableView = (props: ResizableContainerProps) => {
  const {
    maxHeightToResize,
    maxWidthToResize,
    minWidthToResize = 10,
    minHeighToResize = 10,
    fromRight,
    fromBottom,
  } = props;
  const currentWidth$ = useObservable<number | undefined>(maxWidthToResize);
  const currentHeight$ = useObservable<number | undefined>(maxHeightToResize);
  const currentWidth = use$(currentWidth$);
  const currentHeight = use$(currentHeight$);
  const offset = useRef(0);
  const initialLayout = useRef<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const diff = gestureState.moveY;
        const newHeight = diff > 0 ? diff : 0; // no negative values alowed
        const shouldUpdate =
          newHeight >= minHeighToResize &&
          (maxHeightToResize === undefined || newHeight <= maxHeightToResize);
        if (shouldUpdate) {
          currentHeight$.set(newHeight);
        }
      },
      onPanResponderGrant(_, gestureState) {
        gestureState;
      },
    })
  ).current;
  const panResponderRight = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const diff = gestureState.moveX - offset.current;
        console.log('diff: ', diff, gestureState.moveX);
        const newWidht = diff > 0 ? diff : 0; // no negative values alowed
        const shouldUpdate =
          newWidht >= minWidthToResize &&
          (maxWidthToResize === undefined || newWidht <= maxWidthToResize);
        if (shouldUpdate) {
          currentWidth$.set(newWidht);
        }
      },
      onPanResponderGrant(_, gestureState) {
        const curr = currentWidth$.peek() ?? initialLayout.current.width;
        if (curr && gestureState.moveX > curr) {
          offset.current = gestureState.moveX - curr;
        } else {
          // offset.current = curr - gestureState.moveX;
        }
        console.log('grant: ', gestureState.moveX);
      },
    })
  ).current;

  return (
    <View
      {...props}
      onLayout={e => {
        initialLayout.current = e.nativeEvent.layout;
        props.onLayout?.(e);
      }}
      style={[
        props.style,
        {
          maxWidth: currentWidth,
          maxHeight: currentHeight,
        },
      ]}>
      <Memo>
        {() => <View style={styles.container}>{props.children}</View>}
      </Memo>
      {/* Right handler */}
      {fromRight && (
        <ResizerCorner panResponder={panResponderRight} position={'right'} />
      )}

      {/* Bottom resizer */}

      {fromBottom && (
        <ResizerCorner panResponder={panResponder} position={'bottom'} />
      )}
    </View>
  );
};

interface ResizerCornerProps {
  panResponder: PanResponderInstance;
  position: 'right' | 'bottom' | 'left' | 'top';
}

const ResizerCorner = (props: ResizerCornerProps) => {
  const { panResponder, position } = props;
  const [isHovered, setIsHovered] = useState(false);
  const isHorizontal = position === 'right' || position === 'left';
  const colors = useColors();

  const style = {
    flex: 1,
    width: isHorizontal ? 10 : undefined,
    height: isHorizontal ? undefined : 10,
    // borderRightWidth: 4,
    borderColor: 'transparent',
  } as const;

  const indicatorStyle = {
    backgroundColor: colors.accentDefault,
    flex: 1,
    borderRadius: 30,
  };
  const opacity = isHovered ? 1 : 0;
  const indicatorWidth = isHorizontal
    ? {
        maxWidth: 4,
      }
    : {
        maxHeight: 4,
      };

  return (
    <View
      {...panResponder.panHandlers}
      style={[styles.borderRight, pos[position]]}>
      <Pressable
        style={[
          style,
          isHorizontal && styles.onHorizontal,
          !isHorizontal && styles.onVertical,
        ]}
        delayHoverIn={40}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}>
        <View
          style={[
            indicatorStyle,
            indicatorWidth,
            {
              opacity,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const pos = {
  right: { left: undefined },
  left: { right: undefined },
  bottom: { top: undefined },
  top: { bottom: undefined },
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  onHorizontal: {
    paddingTop: 8,
    paddingBottom: 4,
    marginBottom: 8,
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  onVertical: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
