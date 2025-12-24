import { Pressable, StyleSheet, View } from 'react-native';
import { Styled } from '../Styled';
import { useCallback, useRef, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import { VModal } from '../VModal/VModal';
import { suportsBoxShadow } from '../../utils/constants';
import { MenuEntry } from './components/menu-entry';
import { ClosesMenuContext } from './components/close-menu-context';
import { measureViewInWindow } from './menu.utils';
import { useRootViewRef$ } from '../../hooks/useRootViewRef$';
import type { Layout, MenuProps } from './menu.types';

/**
 * Distancia (para separar) entre o menu e target
 */
const DISTANCE_FROM_TARGET = 8;

export const Menu = function Menu(props: MenuProps) {
  const {
    children,
    target,
    maxWidth = 350,
    minWidth = 150,
    extendToTargetWidth,
    menuContainer: MenuContainer = View,
  } = props;
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
  const rootViewRef$ = useRootViewRef$();

  const showOnLeft = () => layout.current.x < layout.current.ww / 2;
  const showOnTop = () => layout.current.y < layout.current.wh / 2;

  const measureChildrenPosition = useCallback(
    () => measureViewInWindow(childrenContainerRef, layout, rootViewRef$),
    [rootViewRef$]
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
                  ...menuContainerStyles,
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
                    colors.backgroundFillColorSolidBackgroundBase,
                  borderColor: colors.strokeColorSurfaceStrokeFlayout,
                  ...shadow,
                  ...backdropFilter,
                  minWidth,
                  maxWidth: extendToTargetWidth
                    ? Math.max(maxWidth, layout.current.width)
                    : maxWidth,
                  width: extendToTargetWidth ? layout.current.width : undefined,
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

Menu.MenuEntry = MenuEntry;

const Container = Styled.createStyledView({});
const TargetContainer = Styled.createStyledView({});

const menuContainerStyles = {
  paddingVertical: 2,
  // borderWidth: StyleSheet.hairlineWidth,
  borderWidth: 1,
  borderRadius: 7,
  position: 'absolute',
} as const;

const MenuArea = Styled.createStyledView({
  paddingHorizontal: 16,
  paddingBottom: 20,
  flex: 1,
  // pointerEvents: 'box-only',
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
