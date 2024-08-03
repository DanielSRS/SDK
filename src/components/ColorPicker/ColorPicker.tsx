import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { PanResponder, InteractionManager } from 'react-native';
import { Base64 } from '../../utils/base64';
import { png } from '../../utils/createPng';
import { createCrossSectionofHSVCylinder } from '../../utils/hsv';
import { useEffect, useRef, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import { interpolate } from '../../utils/linearInterpolation';
import { hsv2rgb } from '../../utils/hsv2rgb';
import { Body } from '../Text/Body';

const SELECTOR_DIAMETER = 14;

export function ColorPicker() {
  const colors = useColors();
  const selectorPosition = useRef(new Animated.ValueXY()).current;
  const [selectedColor, setSelectedColor] = useState<string>();
  const [img, setImg] = useState<{
    pngDataUri: string;
    width: number;
    height: number;
  }>();

  // console.log({ ...selectorPosition.x });

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      const start = Date.now();
      const res = generateColorSection();

      const end = Date.now();
      const elapsed = end - start;
      console.log('ColorPicker generated image in: ', elapsed);

      setImg(res);
    });
    return () => interactionPromise.cancel();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        selectorPosition.setOffset({
          x: (selectorPosition.x as any)._value,
          y: (selectorPosition.y as any)._value,
        });
      },
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderEnd: () => {
      //   console.log('onPanResponderEnd');
      // },
      onPanResponderRelease: () => {
        selectorPosition.flattenOffset();
      },
      onPanResponderMove: (_event, gestureState) => {
        const radius = 128;
        const { dx, dy } = gestureState;
        const dxOffset: number = (selectorPosition.x as any)._offset;
        const dyOffset: number = (selectorPosition.y as any)._offset;
        const x = dx + dxOffset;
        const y = dy + dyOffset;
        const isInTheCircle = x * x + y * y < radius * radius;
        // const x = Math.floor(gestureState.moveX);
        const n = {
          x: dx,
          y: dy,
        };

        console.log(
          JSON.stringify(
            {
              ...gestureState,
              dxOffset,
              dyOffset,
            },
            null,
            2
          )
        );
        if (isInTheCircle) {
          selectorPosition.setValue(n);
        } else {
          console.log('not in the circle');
        }
        // Animated.event(
        //   [
        //     null,
        //     {
        //       dx: selectorPosition.x, // x,y are Animated.Value
        //       dy: selectorPosition.y,
        //     },
        //   ],
        //   { useNativeDriver: false }
        // )(event, gestureState);
      },
    })
  ).current;

  return (
    <View>
      {/* Color box */}
      <View style={styles.colorBox}>
        {!!img && (
          <View>
            <Image
              style={{
                width: img.width,
                height: img.height,
              }}
              source={{ uri: img.pngDataUri }}
            />

            {/* Selector */}
            <View style={[StyleSheet.absoluteFill, styles.selectorContainer]}>
              <Pressable
                onPress={event => {
                  const radius = 128;
                  const x = event.nativeEvent.locationX - radius;
                  const y = event.nativeEvent.locationY - radius;

                  const isInTheCircle = x * x + y * y < radius * radius;

                  if (!isInTheCircle) {
                    return;
                  }

                  Animated.timing(selectorPosition, {
                    useNativeDriver: false,
                    toValue: {
                      x,
                      y,
                    },
                    duration: 100,
                    // easing: Easing.bounce,
                  }).start(r => {
                    if (r.finished) {
                      // setTimeout(() => {
                      //   shouldEase.current = true;
                      // }, 20);
                    }
                  });
                  // console.log(
                  //   JSON.stringify(
                  //     {
                  //       x,
                  //       y,
                  //     },
                  //     null,
                  //     2
                  //   )
                  // );
                }}
                style={StyleSheet.absoluteFill}
              />
              {/* <View
                style={{
                  height: 1,
                  width: '100%',
                  top: 127,
                  left: 0,
                  right: 0,
                  position: 'absolute',
                  backgroundColor: 'white',
                }}
              />
              <View
                style={{
                  width: 1,
                  height: '100%',
                  top: 0,
                  left: 127,
                  bottom: 0,
                  position: 'absolute',
                  backgroundColor: 'white',
                }}
              /> */}
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.selector,
                  {
                    left: selectorPosition.x,
                    top: selectorPosition.y,
                  },
                ]}
                onLayout={event => {
                  const radius = 128;
                  const { height, width, x, y } = event.nativeEvent.layout;
                  const dx = x - radius + width / 2;
                  const dy = y - radius + height / 2;

                  let diffX2 = dx * dx;
                  let diffY2 = dy * dy;

                  const isInTheCircle = diffX2 + diffY2 < radius * radius;

                  if (!isInTheCircle) {
                    // console.log(
                    //   'out of the circle',
                    //   JSON.stringify({ height, width, dx, dy }, null, 2)
                    // );
                    return;
                  }

                  /** Angle in radians */
                  let angle = Math.atan2(radius - y, radius - x);

                  /** Convert it to degrees */
                  angle = angle * (180 / Math.PI);
                  while (angle < 0) {
                    angle += 360;
                  }
                  while (angle > 360) {
                    angle -= 360;
                  }

                  let distance = Math.sqrt(diffX2 + diffY2);
                  const inter = interpolate(0, radius, 0, 1, distance);

                  let color = hsv2rgb(angle, inter, 1);
                  // if (diffX2 + diffY2 < RADIUS_SQ) {
                  //   // console.log(d);
                  // }

                  // const cor = { ...color, a: alpaChannel };

                  // console.log(
                  //   'Ocolor',
                  //   JSON.stringify({ height, width, dx, dy, cor }, null, 2)
                  // );

                  setSelectedColor(`rgb(${color.r}, ${color.g}, ${color.b})`);
                }}
              />
            </View>
          </View>
        )}

        <View
          style={[
            styles.swatchPreview,
            {
              // height: img?.height,
              backgroundColor: selectedColor,
              borderColor: colors.strokeColorControlStrongStrokeDefault,
            },
          ]}
        />
      </View>

      {/* Color */}
      <Body>{selectedColor}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  colorBox: {
    flexDirection: 'row',
    // borderWidth: 1,
    columnGap: 12,
  },
  swatchPreview: {
    borderRadius: 3,
    width: 42,
    height: 256,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  selector: {
    width: SELECTOR_DIAMETER,
    height: SELECTOR_DIAMETER,
    borderWidth: 2,
    borderRadius: 7,
    // transform: [
    //   {
    //     translateX: 0,
    //   },
    // ],
  },
  selectorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function generateColorSection() {
  const RADIUS = 128;
  const width = 2 * RADIUS;
  const height = 2 * RADIUS;
  let pngDataUri = 'data:image/png;base64,';

  const a1 = Date.now();
  const pngData = createCrossSectionofHSVCylinder(RADIUS, 1);
  const a2 = Date.now();
  const pngFile = png(width, height, pngData);
  const a3 = Date.now();

  const base64png = Base64.fromBinaryString(pngFile);
  const a4 = Date.now();
  pngDataUri += base64png;
  const a5 = Date.now();

  console.log(
    JSON.stringify(
      {
        pngData: a2 - a1,
        pngFile: a3 - a2,
        base64png: a4 - a3,
        dataUrl: a5 - a4,
      },
      null,
      2
    )
  );
  return {
    pngDataUri,
    width,
    height,
  };
}
