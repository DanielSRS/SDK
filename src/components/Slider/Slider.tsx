import {
  Animated,
  Easing,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useMemo, useRef, useState } from 'react';

const interpolate = (
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  input: number
) => {
  const unclamped =
    ((input - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) +
    outputMin;
  const clamped = Math.max(outputMin, Math.min(outputMax, unclamped));
  return clamped;
};

interface SliderProps {
  /**
   * Called continuously while sliding
   * @param value Selected value between (inclusive) minimumValue and maximumValue range
   */
  onValueChange?: (value: number) => void;
  /**
   * Max value that can be selected
   */
  maximumValue?: number;
  /**
   * Min value that can be selected
   */
  minimumValue?: number;
}
export function Slider(props: SliderProps) {
  const { maximumValue = 1, minimumValue = 0, onValueChange } = props;
  const shouldEase = useRef(true);
  const [trackWidth, setTrackWidth] = useState(0);
  const colors = useColors();
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderEnd: () => {
      //   console.log('onPanResponderEnd');
      // },
      // onPanResponderRelease: () => {
      //   console.log('onPanResponderRelease');
      // },
      onPanResponderMove: (_, gestureState) => {
        // const x = Math.floor(gestureState.moveX);
        pan.setValue(gestureState.moveX);
      },
    })
  ).current;

  const innerThumb = useMemo(
    () => ({
      backgroundColor: colors.fillColorAccentDefault,
    }),
    [colors.fillColorAccentDefault]
  );

  function EaseOnGesture(e: number) {
    if (shouldEase.current) {
      return Easing.ease(e);
    }
    return e;
  }

  const interpolateConfig = useMemo(
    () => ({
      inputRange: [
        trackWidth - trackWidth,
        trackWidth > 20 ? 20 : 0,
        trackWidth,
      ],
      outputRange: [0, 0, trackWidth - 20],
      extrapolate: 'clamp' as const,
      easing: EaseOnGesture,
    }),
    [trackWidth]
  );

  const onTrackPress = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    shouldEase.current = false;
    Animated.timing(pan, {
      useNativeDriver: false,
      toValue: x,
      duration: 100,
      // easing: Easing.bounce,
    }).start(r => {
      if (r.finished) {
        setTimeout(() => {
          shouldEase.current = true;
        }, 20);
      }
    });
  };

  const onTrackDraged = (e: LayoutChangeEvent) => {
    let x = e.nativeEvent.layout.x;
    const width = e.nativeEvent.layout.width;
    if (x + width === trackWidth) {
      x = trackWidth;
    }
    const res = interpolate(0, trackWidth, minimumValue, maximumValue, x);
    // console.log('Range: ', res);
    onValueChange?.(res);
  };

  return (
    <View
      style={styles.slider}
      onLayout={e => {
        const width = e.nativeEvent.layout.width;
        // totalWidth.current = width;
        // console.log('Track width: ', width);
        setTrackWidth(width);
      }}>
      {/* Track */}
      <View
        style={[
          styles.track,
          {
            backgroundColor: colors.fillColorControlStrongDefault,
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.track,
          {
            backgroundColor: colors.fillColorAccentDefault,
            width: pan.interpolate(interpolateConfig),
          },
        ]}
      />
      {/* Pressable Track */}
      <Pressable
        onPress={onTrackPress}
        style={[StyleSheet.absoluteFill, styles.pressableTrack]}
      />

      {/* Thumb */}
      <Animated.View
        {...panResponder.panHandlers}
        onLayout={onTrackDraged}
        style={[
          StyleSheet.absoluteFill,
          styles.thumb,
          {
            backgroundColor: colors.fillColorControlSolidDefault,
            left: pan.interpolate(interpolateConfig),
          },
        ]}>
        <View style={[styles.innerThumb, innerThumb]} />
        {}
      </Animated.View>
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {},
  rail: {},

  innerThumb: {
    width: 12,
    height: 12,
    // backgroundColor: colors.fillColorAccentDefault,
    borderRadius: 6,
  },
  thumb: {
    width: 20,
    height: 20,
    // backgroundColor: colors.fillColorControlSolidDefault,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      // { translateX: pan.x },
      {
        translateY: -7,
      },
    ],
  },
  track: {
    height: 4,
    borderRadius: 20,
  },
  pressableTrack: {
    // backgroundColor: 'rgba(255, 0, 0, 0.3)',
    height: 30,
    width: '105%',
    transform: [
      {
        translateY: -13,
      },
      {
        translateX: -8,
      },
    ],
  },
});
