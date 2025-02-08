import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { PanResponder, InteractionManager } from 'react-native';
import { Base64 } from '../../utils/base64';
import { png } from '../../utils/createPng';
import { createCrossSectionofHSVCylinder } from '../../utils/hsv';
import { useEffect, useRef, type ComponentProps } from 'react';
import { useColors } from '../../hooks/useColors';
import { interpolate } from '../../utils/linearInterpolation';
import { hsv2rgb } from '../../utils/hsv2rgb';
import { Body } from '../Text/Body';
import { Memo, use$, useObservable } from '@legendapp/state/react';
import { Colors$ } from '../../contexts/colors/colors';
import { Styled } from '../Styled';
import { Constants } from '../../utils/constants';

const SELECTOR_DIAMETER = 14;

interface ColorPickerProps {
  //
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface GeneratedImage {
  pngDataUri: string;
  width: number;
  height: number;
}

/**
 * Not a constant.
 */
const COORDINATES = {
  dx: 0,
  dy: 0,
  dxOffset: 0,
  dyOffset: 0,
  x: 0,
  y: 0,
  isInTheCircle: true,
  xLinha: 0,
  yLinha: 0,
};

const WHITE_COLOR = {
  r: 255,
  g: 255,
  b: 255,
};

export function ColorPicker(props: ColorPickerProps) {
  const {} = props;
  const colors = useColors();
  const selectorPosition = useRef(new Animated.ValueXY()).current;
  const selectedColor$ = useObservable<RGB>(WHITE_COLOR);
  const img$ = useObservable<GeneratedImage>();
  const coordinates$ = useObservable(COORDINATES);

  // console.log({ ...selectorPosition.x });

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      const start = Date.now();
      const res = generateColorSection();

      const end = Date.now();
      const elapsed = end - start;
      elapsed;
      // console.log('ColorPicker generated image in: ', elapsed);

      img$.set(res);
    });
    return () => interactionPromise.cancel();
  }, [img$]);

  useEffect(() => {
    const id = selectorPosition.addListener(v => {
      const radius = 128;
      const x = Math.floor(v.x + radius);
      const y = Math.floor(v.y + radius);
      const color = calculateColor({
        height: 0,
        radius: radius,
        width: 0,
        x: x,
        y: y,
      });
      if (color) {
        selectedColor$.set(color);
      }
    });

    return () => {
      selectorPosition.removeListener(id);
    };
  }, [selectedColor$, selectorPosition]);

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

        const xSqrt = x * x;
        const ySqrt = y * y;
        const isInTheCircle = xSqrt + ySqrt < radius * radius;
        // const x = Math.floor(gestureState.moveX);
        const n = {
          x: dx,
          y: dy,
        };
        const distance = Math.sqrt(x * x + y * y);
        const xLinha = (radius * x) / distance - dxOffset;
        const yLinha = (radius * y) / distance - dyOffset;

        coordinates$.set({
          dx,
          dxOffset,
          dy,
          dyOffset,
          isInTheCircle,
          x,
          y,
          xLinha,
          yLinha,
        });

        // console.log(
        //   JSON.stringify(
        //     {
        //       ...gestureState,
        //       dxOffset,
        //       dyOffset,
        //     },
        //     null,
        //     2
        //   )
        // );
        if (isInTheCircle) {
          selectorPosition.setValue(n);
        } else {
          selectorPosition.setValue({
            x: xLinha,
            y: yLinha,
          });
        }
      },
    })
  ).current;

  return (
    <View>
      {/* Color box */}
      <View style={styles.colorBox}>
        <Memo>
          {() => {
            const img = img$.get();

            if (!img) {
              return null;
            }

            return (
              <View>
                <Image
                  style={{
                    width: img.width,
                    height: img.height,
                  }}
                  source={{ uri: img.pngDataUri }}
                />

                {/* Selector */}
                <View
                  style={[StyleSheet.absoluteFill, styles.selectorContainer]}>
                  <Pressable
                    onPress={event => {
                      const radius = 128;
                      let locationX = event.nativeEvent.locationX;
                      let locationY = event.nativeEvent.locationY;

                      if (Constants.IS_WEB) {
                        const location: object = event.nativeEvent;
                        if (
                          !('offsetX' in location) ||
                          !('offsetY' in location) ||
                          typeof location.offsetX !== 'number' ||
                          typeof location.offsetY !== 'number'
                        ) {
                          console.error('Pressable event has no location info');
                        } else {
                          locationX = location.offsetX;
                          locationY = location.offsetY;
                        }
                      }

                      const x = locationX - radius;
                      const y = locationY - radius;

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
                      }).start();
                    }}
                    style={StyleSheet.absoluteFill}
                  />
                  <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                      styles.selector,
                      {
                        left: selectorPosition.x,
                        top: selectorPosition.y,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          }}
        </Memo>

        <Memo>
          {() => {
            const { b, g, r } = selectedColor$.get();
            return (
              <View
                style={[
                  styles.swatchPreview,
                  {
                    // height: img?.height,
                    backgroundColor: `rgb(${r}, ${g}, ${b})`,
                    borderColor: colors.strokeColorControlStrongStrokeDefault,
                  },
                ]}
              />
            );
          }}
        </Memo>
      </View>

      {/* Color */}
      <Row>
        <InputGroup>
          <Row>
            <Input defaultValue={'RGB'} />
          </Row>
          <Row>
            <Memo>
              {() => {
                const r = selectedColor$.r.get()?.toString();
                return (
                  <Input
                    key={Constants.IS_WEB ? r : undefined}
                    defaultValue={r}
                  />
                );
              }}
            </Memo>
            <Body>Red</Body>
          </Row>
          <Row>
            <Memo>
              {() => {
                const g = selectedColor$.g.get()?.toString();
                return (
                  <Input
                    key={Constants.IS_WEB ? g : undefined}
                    defaultValue={g}
                  />
                );
              }}
            </Memo>
            <Body>Green</Body>
          </Row>
          <Row>
            <Memo>
              {() => {
                const b = selectedColor$.b.get()?.toString();
                return (
                  <Input
                    key={Constants.IS_WEB ? b : undefined}
                    defaultValue={b}
                  />
                );
              }}
            </Memo>
            <Body>Blue</Body>
          </Row>
        </InputGroup>
        <InputGroup>
          <Memo>
            {() => {
              const { b, g, r } = selectedColor$.get() ?? WHITE_COLOR;
              const color =
                `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`.toUpperCase();
              return (
                <Input
                  key={Constants.IS_WEB ? color : undefined}
                  defaultValue={color}
                />
              );
            }}
          </Memo>
        </InputGroup>
      </Row>
      {/* <Memo>
        {() => {
          const coordinates = coordinates$.get();
          return (
            <>
              <Body>{`dx\t\t\t\t\t\t${coordinates.dx}`}</Body>
              <Body>{`x\t\t\t\t\t\t${coordinates.x}`}</Body>
              <Body>{`dy\t\t\t\t\t\t${coordinates.dy}`}</Body>
              <Body>{`y\t\t\t\t\t\t${coordinates.y}`}</Body>
              <Body>{`xLinha\t\t\t\t\t${coordinates.xLinha}`}</Body>
              <Body>{`yLinha\t\t\t\t\t${coordinates.yLinha}`}</Body>
              <Body>{`dxOffset\t\t\t\t\t${coordinates.dxOffset}`}</Body>
              <Body>{`dyOffset\t\t\t\t${coordinates.dyOffset}`}</Body>
              <Body>{`isInTheCircle\t\t\t\t${coordinates.isInTheCircle}`}</Body>
            </>
          );
        }}
      </Memo> */}
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

function Input(props: ComponentProps<typeof TextInput>) {
  const colors = use$(Colors$);
  const sty: StyleProp<TextStyle> = {
    borderWidth: 1,
    borderRadius: 4,
    // minHeight: 32,
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: 110,
    color: colors.fillColorTextSecondary,
    backgroundColor: colors.fillColorControlDefault,
    borderColor: colors.strokeColorSurfaceStrokeFlayout,
    borderBottomColor: colors.fillColorControlStrongDefault,
  } as const;
  return <TextInput {...props} style={[sty, props.style]} />;
}

const Row = Styled.createStyledView({
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 8,
});

const InputGroup = Styled.createStyledView({
  paddingTop: 32,
  rowGap: 12,
  // borderWidth: 1,
  // borderColor: 'red',
  height: '100%',
});

interface CalculateColorProps {
  height: number;
  width: number;
  x: number;
  y: number;
  radius: number;
}
const calculateColor = (props: CalculateColorProps) => {
  const { height, width, x, y, radius } = props;
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

  return color;
};
