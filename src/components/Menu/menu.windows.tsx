import { use$ } from '@legendapp/state/react';
// @ts-expect-error
import { Flyout } from 'react-native-windows';
import { Styled } from '../Styled';
import { useColors } from '../../hooks/useColors';
import { MenuEntry } from './components/menu-entry';
import { useColorScheme } from '../../hooks/useColorSheme';
import { ClosesMenuContext } from './components/close-menu-context';
import { SystemColorScheme$ } from '../../contexts/colorScheme/color-scheme';
import { Pressable, StyleSheet, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { measureViewInWindow, MenuAcrylicBrush } from './menu.utils';
import type { Layout, MenuProps } from './menu.types';

export const Menu = function Menu(props: MenuProps) {
  const {
    children,
    target,
    maxWidth = 350,
    minWidth = 150,
    extendToTargetWidth,
  } = props;
  const [showFlyout, setShowFlyout] = useState(false);
  const [enablePointer, setEnablePointer] = useState(false);
  const colors = useColors();
  const systemScheme = use$(SystemColorScheme$);
  const currentTheme = useColorScheme();
  const layout = useRef<Layout>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    wh: 0,
    ww: 0,
  });
  const childrenContainerRef = useRef<View>(null);

  const showOnLeft = () => layout.current.x < layout.current.ww / 2;
  const showOnTop = () => layout.current.y < layout.current.wh / 2;
  const close = () => {
    setEnablePointer(false);
    setShowFlyout(false);
  };
  const pointerEvents = enablePointer ? undefined : 'none';

  const measureChildrenPosition = useCallback(
    () => measureViewInWindow(childrenContainerRef, layout),
    []
  );

  const open = () => {
    setShowFlyout(true);
    setTimeout(() => {
      setEnablePointer(true);
    }, 200);
  };

  return (
    <Container>
      <View ref={childrenContainerRef} onLayout={measureChildrenPosition}>
        {target}
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          onPress={open}
        />
      </View>

      <Flyout
        isOpen={showFlyout}
        onDismiss={close}
        target={childrenContainerRef.current}
        placement={(() => {
          if (showOnTop()) {
            return showOnLeft()
              ? 'top-edge-aligned-left'
              : 'top-edge-aligned-right';
          }
          return showOnLeft()
            ? 'bottom-edge-aligned-left'
            : 'bottom-edge-aligned-right';
        })()}>
        <ClosesMenuContext.Provider value={close}>
          <MenuContainer
            style={{
              backgroundColor: MenuAcrylicBrush(systemScheme, currentTheme),
              pointerEvents,
              minWidth,
              maxWidth: extendToTargetWidth
                ? Math.max(maxWidth, layout.current.width)
                : maxWidth,
              width: extendToTargetWidth ? layout.current.width : undefined,
            }}>
            <Acrylic
              style={{
                borderColor: colors.strokeColorSurfaceStrokeFlayout,
                // backgroundColor: colors.backgroundFillColorLayerOnAcrylicDefault,
              }}>
              {children}
            </Acrylic>
          </MenuContainer>
        </ClosesMenuContext.Provider>
      </Flyout>
    </Container>
  );
};

Menu.MenuEntry = MenuEntry;

const Container = Styled.createStyledView({});
const Acrylic = Styled.createStyledView({
  paddingVertical: 2,
  borderRadius: 7,
  borderWidth: 1,
  overflow: 'hidden',
});

const MenuContainer = Styled.createStyledView({
  // borderWidth: StyleSheet.hairlineWidth,
  borderRadius: 7,
  overflow: 'hidden',
  // position: 'absolute',
});
