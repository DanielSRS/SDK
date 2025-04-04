import {
  Platform,
  Pressable,
  StyleSheet,
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
  type ReactNode,
} from 'react';
import { Body } from '../Text/Body';
import { HoverIndicator } from '../HoverIndicator';
import { useColors } from '../../hooks/useColors';
import { VModal } from '../VModal/VModal';
import { Caption } from '../Text/Caption';
import { suportsBoxShadow } from '../../utils/constants';
import {
  RootSDKViewDimensions$,
  RootViewRef$,
} from '../AppBackground/AppBackground';

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
  /** window height */
  wh: number;
  /** window width */
  ww: number;
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
    wh: 0,
    ww: 0,
  });
  const childrenContainerRef = useRef<View>(null);
  const colors = useColors();

  const showOnLeft = () => layout.current.x < layout.current.ww / 2;
  const showOnTop = () => layout.current.y < layout.current.wh / 2;

  const measureChildrenPosition = useCallback(
    () =>
      new Promise<Layout>((resolve, _reject) => {
        // const i = Date.now();
        const rootViewRef = RootViewRef$.peek()?.current;
        if (!rootViewRef) {
          return;
        }
        childrenContainerRef.current?.measureLayout(
          rootViewRef,
          (left, top, width, height) => {
            const sdkrootview = RootSDKViewDimensions$.peek();
            const _layout = {
              x: left,
              y: top,
              height,
              width,
              wh: sdkrootview.height,
              ww: sdkrootview.width,
            };
            // const f = Date.now();
            // console.log(
            //   `medido em: ${f - i}ms \n`,
            //   JSON.stringify(layout, null, 2)
            // );
            resolve(_layout);
            layout.current = _layout;
          }
        );
      }),
    []
  );

  const close = () => {
    measureChildrenPosition();
    setIsMenuOpened(false);
  };
  const open = () => {
    measureChildrenPosition();
    setIsMenuOpened(true);
  };

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
                    : layout.current.wh -
                      layout.current.y +
                      DISTANCE_FROM_TARGET,
                  right: showOnLeft()
                    ? undefined
                    : layout.current.ww -
                      layout.current.x -
                      layout.current.width,
                  left: showOnLeft() ? layout.current.x : undefined,
                  backgroundColor:
                    colors.backgroundFillColorLayerOnAcrylicDefault,
                  // backgroundColor: 'red',
                  ...(!suportsBoxShadow && {
                    backgroundColor:
                      colors.backgroundFillColorSolidBackgroundBase,
                  }),
                  borderColor: colors.strokeColorSurfaceStrokeFlayout,
                  ...shadow,
                  ...backdropFilter,
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

const backdropFilter = {
  backdropFilter: 'blur(20px)',
};

const IS_MAC_OS = Platform.OS === 'macos';

interface MenuEntryProps extends Omit<TouchableOpacityProps, 'children'> {
  children: string;
  left?: ReactNode | (() => ReactNode);
  right?: ReactNode | (() => ReactNode);
}
const MenuEntry = function MenuEntry(props: MenuEntryProps) {
  const { children, left, right, onPress, ...rest } = props;
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
      <MenuEntryHoverContainer>
        <HoverIndicator />
        {!!left && renderFunctionOrNode(left)}
        {IS_MAC_OS && <Caption style={ignoreMouseEvents}>{children}</Caption>}
        {!IS_MAC_OS && <Body style={ignoreMouseEvents}>{children}</Body>}
        {!!right && renderFunctionOrNode(right)}
      </MenuEntryHoverContainer>
    </MenuEntryContainer>
  );
};

function renderFunctionOrNode(item?: ReactNode | (() => ReactNode)) {
  if (typeof item === 'function') {
    return item();
  }
  return item;
}

const ignoreMouseEvents = { pointerEvents: 'none', flex: 1 } as const;

Menu.MenuEntry = MenuEntry;

const Container = Styled.createStyledView({});
const TargetContainer = Styled.createStyledView({});

const MenuContainer = Styled.createStyledView({
  paddingVertical: 2,
  // borderWidth: StyleSheet.hairlineWidth,
  borderWidth: 1,
  maxWidth: 350,
  minWidth: 250,
  borderRadius: 7,
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
  // backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 2,
  borderRadius: 4,
  overflow: 'hidden',
});

const MenuEntryHoverContainer = Styled.createStyledView({
  minHeight: IS_MAC_OS ? 32 : 36,
  // backgroundColor: 'blue',
  paddingHorizontal: 11,
  borderRadius: 3,
  overflow: 'hidden',
  alignItems: 'center',
  flexDirection: 'row',
  columnGap: 12,
});

const bshadow = {
  boxShadow: '10 10 43 0 rgba(0,0,0,0.59)',
} as const;

const shadow = suportsBoxShadow
  ? bshadow
  : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.14,
      shadowRadius: 16.0,

      elevation: 24,
    };
