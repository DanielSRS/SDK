import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type GestureResponderEvent,
  type TouchableOpacityProps,
} from 'react-native';
import { Styled } from '../Styled';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Body } from '../Text/Body';
import { HoverIndicator } from '../HoverIndicator';
import { useColors } from '../../hooks/useColors';
import { VModal } from '../VModal/VModal';

const ClosesMenuContext = createContext(() => {});
/**
 * Distancia (para separar) entre o menu e target
 */
const DISTANCE_FROM_TARGET = 8;

interface Layout {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface MenuProps {
  children: React.ReactNode;
  target: React.ReactNode;
}
export const Menu = function Menu(props: MenuProps) {
  const { children, target } = props;
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const layout = useRef<Layout>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const childrenContainerRef = useRef<View>(null);
  const { height, width } = useWindowDimensions();
  const colors = useColors();

  const showOnLeft = () => layout.current.x < width / 2;
  const showOnTop = () => layout.current.y < height / 2;

  const measureChildrenPosition = useCallback(
    () =>
      new Promise<Layout>((resolve, _reject) => {
        // const i = Date.now();
        childrenContainerRef.current?.measureInWindow((x, y, w, h) => {
          const _layout = {
            x,
            y,
            height: h,
            width: w,
          };
          // const f = Date.now();
          // console.log(
          //   `medido em: ${f - i}ms \n`,
          //   JSON.stringify(layout, null, 2)
          // );
          resolve(_layout);
          layout.current = _layout;
        });
      }),
    []
  );

  const close = () => setIsMenuOpened(false);
  const open = () => setIsMenuOpened(true);

  return (
    <Container>
      <TargetContainer
        ref={childrenContainerRef}
        onLayout={measureChildrenPosition}>
        {target}
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          onPress={open}
        />
      </TargetContainer>
      <VModal transparent={true} visible={isMenuOpened} onRequestClose={close}>
        {/* Fundo desfocado */}
        {/* <Animated.View style={[FLEX_ONE, { opacity }]}>
          <BlurView style={FLEX_ONE} blurType="light">
            <Pressable onPress={close} style={[FLEX_ONE]}>
              {}
              {}
            </Pressable>
          </BlurView>
        </Animated.View> */}

        {/* Area fora do menu. cliques nessa area fecham o menu */}
        <Pressable
          onPress={close}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          {/* Menu content */}
          <MenuArea>
            <ClosesMenuContext.Provider value={close}>
              <MenuContainer
                style={{
                  top: showOnTop()
                    ? layout.current.y +
                      layout.current.height +
                      DISTANCE_FROM_TARGET
                    : undefined,
                  bottom: showOnTop()
                    ? undefined
                    : height - layout.current.y + DISTANCE_FROM_TARGET,
                  right: showOnLeft()
                    ? undefined
                    : width - layout.current.x - layout.current.width,
                  left: showOnLeft() ? layout.current.x : undefined,
                  backgroundColor:
                    colors.backgroundFillColorCardBackgroundDefault,
                  borderColor: colors.strokeColorDividerStrokeDefault,
                  ...shadow,
                }}>
                {children}
              </MenuContainer>
            </ClosesMenuContext.Provider>
          </MenuArea>
        </Pressable>
      </VModal>
    </Container>
  );
};

interface MenuEntryProps extends Omit<TouchableOpacityProps, 'children'> {
  children: string;
}
const MenuEntry = function MenuEntry(props: MenuEntryProps) {
  const { children, onPress, ...rest } = props;
  const close = useContext(ClosesMenuContext);

  const onMenuPress = useCallback(
    (event: GestureResponderEvent) => {
      close();
      onPress?.(event);
    },
    [close, onPress]
  );

  return (
    <MenuEntryContainer {...rest} onPress={onMenuPress}>
      <HoverIndicator />
      <Body>{children}</Body>
    </MenuEntryContainer>
  );
};

Menu.MenuEntry = MenuEntry;

const Container = Styled.createStyledView({});
const TargetContainer = Styled.createStyledView({});

const MenuContainer = Styled.createStyledView({
  padding: 5,
  borderWidth: StyleSheet.hairlineWidth,
  maxWidth: 200,
  minWidth: 150,
  borderRadius: 9,
  rowGap: 4,
  position: 'absolute',
});

const MenuArea = Styled.createStyledView({
  paddingHorizontal: 16,
  paddingBottom: 20,
  flex: 1,
  // pointerEvents: 'box-only',
});

const MenuEntryContainer = Styled.createStyledTouchableOpacity({
  // paddingHorizontal: 16,
  // paddingVertical: 8,
  // backgroundColor: 'red',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
  overflow: 'hidden',
});

const bshadow = {
  boxShadow: '10 10 43 0 rgba(0,0,0,0.59)',
} as const;

const shadow =
  Platform.constants.reactNativeVersion.minor >= 76
    ? bshadow
    : {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.0,

        elevation: 24,
        backgroundColor: 'white',
      };
